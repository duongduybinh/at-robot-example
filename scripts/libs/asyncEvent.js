console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'asyncEvent.js')
class AsyncEventWrapper {
    constructor(eventBus) {
        this.bus = eventBus;
        this._resetTimeout = null; // sẽ được inject từ Tester
    }

    setResetTimeout(fn) {
        this._resetTimeout = fn;
    }

    async executeAndWait(eventName, callback, onStart, onDone) {
        const eventAsync = this.onceAsync(eventName);

        Tester.console.log(`Listening for onceAsync: ${eventName}`);
        if (onStart)
            await onStart();

        let callbackResult;
        if (callback) {
            Tester.console.log('Execute:', callback);
            callbackResult = callback();
        }

        await eventAsync;

        Tester.console.log(`onceAsync received: ${eventName}`);
        if (onDone)
            await onDone();


        return callbackResult;
    }

    async sleep(ms) {
        const start = new Date();
        Tester.console.log(`[AsyncEvent] Sleep ${ms}ms start at ${start.toLocaleTimeString()}`);
        return new Promise(resolve => {
            setTimeout(() => {
                const end = new Date();
                Tester.console.log(`[AsyncEvent] Wake up at ${end.toLocaleTimeString()} after ${ms}ms`);
                resolve();
            }, ms);
        });
    }

    onceAsync(eventName) {
        return new Promise(resolve => {
            this.bus.one(eventName, (e, ...args) => {
                const result = args.length > 1 ? args : args[0];
                resolve(result);

                // mỗi lần resolve thì reset timeout nếu có
                if (this._resetTimeout) {
                    this._resetTimeout();
                }
            });
        });
    }

    onAsync(eventName) {
        const queue = [];
        let resolver = null;

        this.bus.on(eventName, (e, ...args) => {
            queue.push(args.length > 1 ? args : args[0]);
            if (resolver) {
                resolver(queue.shift());
                resolver = null;
                if (this._resetTimeout)
                    this._resetTimeout(); // resetTimeout khi có sự kiện
            }
        });

        return {
            next: () => {
                if (queue.length > 0) {
                    return Promise.resolve(queue.shift());
                }
                return new Promise(resolve => {
                    resolver = resolve;
                });
            }
        };
    }
}

window.ClassProvider.AsyncEvent = AsyncEventWrapper;