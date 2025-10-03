console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'asyncEvent.js')
class AsyncEventWrapper {
    constructor(eventBus) {
        this.bus = eventBus;
        this._resetTimeout = null; // sẽ được inject từ Tester
    }

    setResetTimeout(fn) {
        this._resetTimeout = fn;
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