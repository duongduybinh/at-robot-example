console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'page.js')
class Page {
    constructor() {
        if (window.app)
            this.app = app;
    }

    getViewName() {
        if (this.app && this.app.getViewName)
            return this.app.getViewName();
        return 'SignIn';
    }

    getModuleName() {
        if (this.app)
            return this.app.getModuleName();
        return 'Login';
    }

    getAppName() {
        if (this.app)
            return this.app.getAppName();
        return 'AUTH';
    }

    getTitle() {
        return document.title;
    }

    reload() {
        window.location.reload();
    }

    scrollIntoView(element, options = {}) {
        const {
            behavior= 'instant',
            block= 'start' // hoặc 'center', 'start', 'end'
        } = options;
        element.scrollIntoView({
            behavior: behavior,
            block: block
        });
    }

}

window.ClassProvider.Page = Page;