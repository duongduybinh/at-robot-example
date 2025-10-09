console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'tester.js')
class Test {

    static CreateInstance(baseUrl, user, pass) {
        if (!window.Tester) {
            console.log(new Date().toLocaleTimeString(), '[Tester][Info]', '|', 'Create Tester Instance')
            return new window.ClassProvider.Tester(baseUrl, user, pass);
        }
        return window.Tester;
    }

    constructor(baseUrl, user, pass) {
        if (window.Tester) {
            this.console.log('Tester Is Existed');
            // Nếu đã có instance rồi thì return instance đó (ngăn việc tạo thêm)
            return window.Tester;
        }
        this.initConsole();
        this.registerAllEvents('[Preload]');
        this.baseUrl = baseUrl;
        this.ASYNC_INSTANCES = [];

        // chờ page load xong + delay 1s
        this.waitForPageLoad(5000).then(() => {
            this.init();
            this.initPage();
            this.configApi(baseUrl, user, pass);
            this.configAsyncEvent();
        });

        window.Tester = this;
    }

    init() {
        this.console.info('Tester Init');
        this.listView = new window.ClassProvider.ListView();
        this.detailView = new window.ClassProvider.DetailView();
        this.registerAllEvents('[Loaded]');
    }

    initPage() {
        this.console.info('Page Init');
        this.page = new window.ClassProvider.Page();
        this.console.info('Current Page (App:Module:View) |', `${this.page.getAppName()}:${this.page.getModuleName()}:${this.page.getViewName()}`);
    }

    initConsole() {
        this.console = {
            log: (...args) => console.log(new Date().toLocaleTimeString(), '[Tester][Log]', '|', ...args),
            error: (...args) => console.error(new Date().toLocaleTimeString(), '[Tester][Error]', ...args),
            info: (...args) => console.info(new Date().toLocaleTimeString(), '[Tester][Info]', '|', ...args),
            warn: (...args) => console.warn(new Date().toLocaleTimeString(), '[Tester][Warn]', '|', ...args),
            trace: (...args) => console.trace(new Date().toLocaleTimeString(), '[Tester][Trace]', '|', ...args),
        };

        this.console.info('Console Init');
    }

    setTestName(testName) {
        this.testName = testName;
        localStorage.setItem("Tester.testName", this.testName);
    }

    getTestName() {
        if (!this.testName)
            this.testName = localStorage.getItem("Tester.testName");
        return this.testName;
    }

    setTestStep(step) {
        this.testStep = step;
        localStorage.setItem("Tester.testStep", this.testStep);
    }

    getTestStep() {
        if (!this.testStep)
            this.testStep = localStorage.getItem("Tester.testStep");
        return this.testStep;
    }

    setTestData(testData) {
        this.testData = testData;
        localStorage.setItem("Tester.testData", JSON.stringify(this.testData));
    }

    getTestData() {
        if (!this.testData) {
            const data = localStorage.getItem("Tester.testData");
            if (data)
                this.testData = JSON.parse(data);
        }
        return this.testData
    }

    newTestCase(testName, step = 0, testData = {}) {
        this.setTestName(testName);
        this.setTestStep(step);
        this.setTestData(testData);
        this.console.info('New Test Case |', this.testName, `step:${this.testStep}`, `data:${JSON.stringify(this.testData)}`);
    }

    configApi(baseUrl, user, pass) {
        this.apiBaseUrl = baseUrl;
        this.apiUser = user;
        this.apiPass = pass;
        this.api = new window.ClassProvider.Api(this.apiBaseUrl, this.apiUser, this.apiPass);
        this.ASYNC_INSTANCES.push(this.api);
        this.console.log('Tester.configApi', this.api.getToken());
    }

    configAsyncEvent() {
        this.console.info('Tester.configAsyncEvent');
        if (!app || !app.event) {
            this.console.log('Không load được app.event', '=>', 'Dừng tạo asyncEvent');
            return;
        }
        this.asyncEvent = new window.ClassProvider.AsyncEvent(app.event);
        this.ASYNC_INSTANCES.push(this.asyncEvent);
    }

    setResetTimeout(resetTimer) {
        this.console.log('Tester.setResetTimeout', this.ASYNC_INSTANCES);
        for (const instance of this.ASYNC_INSTANCES) {
            Tester.console.log('ASYNC_INSTANCES', instance);
            if (typeof instance.setResetTimeout === "function")
                instance.setResetTimeout(resetTimer);
        }
    }

    getAllEventNames = () => {
        let events = $._data(app.event.el[0], 'events');
        let eventNames = [];
        for (let eventName in events) {
            let eventGroup = events[eventName];
            for (let event of eventGroup) {
                eventNames.push(`${event.type}.${event.namespace}`);
            }
        }
        return [...new Set(eventNames)]
    }

    registerAllEvents(tag = '') {
        this.console.info('registerAllEvents', `${tag}`);
        let eventNames = this.getAllEventNames();
        for (let eventName of eventNames) {
            app.event.on(eventName, () => {
                this.console.info(`[Capture]${tag} ${eventName}`);

            });
        }
        return [...new Set(eventNames)]
    }

    getCurrentLocation() {
        return window.location;
    }

    getCurrentUrl() {
        return this.getCurrentLocation().href;
    }

    getQueryString() {
        return this.getCurrentLocation().search;
    }

    async waitForPageLoad(delayMs = 0) {
        if (document.readyState === "complete") {
            if (delayMs > 0) await new Promise(res => setTimeout(res, delayMs));
            return;
        }
        await new Promise(resolve =>
            window.addEventListener("load", resolve, { once: true })
        );
        if (delayMs > 0) await new Promise(res => setTimeout(res, delayMs));
    }

    static async runWithRetry(callback, options = {}) {
        const {
            retries = 10,
            timeoutMs = 5000,
            delayBetweenRetries = 1000,
        } = options;


        // Chờ cho đến khi Tester có mặt
        while (!window.Tester) {
            await new Promise(res => setTimeout(res, 100)); // check mỗi 100ms
        }
        const instance = window.Tester;

        await instance.waitForPageLoad(1500);

        for (let attempt = 1; attempt <= retries; attempt++) {
            let timer;
            let resetTimer;

            const watchdog = () => new Promise((_, reject) => {
                timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);
                resetTimer = () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);
                };

                // inject resetTimer vào asyncEvent
                instance.setResetTimeout(resetTimer);
            });

            try {
                const result = await Promise.race([
                    callback(),
                    watchdog()
                ]);
                return result;
            } catch (err) {
                instance.console.error(`[runWithRetry][Attempt ${attempt}/${retries}]`, err.message || err);
                if (attempt === retries) throw new Error(`Failed after ${retries} attempts: ${err.message || err}`);
                if (delayBetweenRetries > 0) {
                    await new Promise(res => setTimeout(res, delayBetweenRetries));
                }
            } finally {
                clearTimeout(timer);
                instance.setResetTimeout(null);// cleanup
            }
        }
    }

    async waitForPageLoad(delay = 1000) {
        if (document.readyState === "complete") {
            await new Promise(res => setTimeout(res, delay));
        } else {
            await new Promise(res => {
                window.addEventListener("load", () => setTimeout(res, delay), { once: true });
            });
        }
    }

    masking(value, keepStart = 0, keepEnd = 0) {
        if (typeof value !== 'string') value = String(value);
        const len = value.length;

        if (keepStart + keepEnd >= len) return value; // nếu giữ quá nhiều thì không cần mask

        const start = value.slice(0, keepStart);
        const end = value.slice(len - keepEnd);
        const masked = '*'.repeat(len - keepStart - keepEnd);

        return start + masked + end;
    }
}

window.ClassProvider.Tester = Test;