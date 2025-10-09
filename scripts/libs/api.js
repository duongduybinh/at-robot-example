console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'api.js')
class Api {
    constructor(baseUrl, user, pass) {
        this.baseUrl = baseUrl;
        this.user = user;
        this.pass = pass;
    }

    getToken() {
        if (!this.token)
            return btoa(this.user + ":" + this.pass);
        return this.token;
    }

    getFullUrl(url) {
        return new URL(url, this.baseUrl).toString();
    }

    setResetTimeout(fn) {
        this._resetTimeout = fn;
    }

    async request(method, url, requestBody, contentType = 'application/json', headers = {}, isBasicAuth = true) {
        try {
            let fullUrl = this.getFullUrl(url);
            if (window.Tester)
                window.Tester.console.log('Api.request', method, contentType, fullUrl, requestBody);
            let options = {
                method: method,
                headers: {
                    "Content-Type": contentType,
                    ... (headers || {})
                },
                body: requestBody
            };

            if (isBasicAuth) {
                options.headers["Authorization"] = "Basic " + this.getToken();
            }

            const response = await fetch(this.getFullUrl(url), options);


            // Nếu gọi thành công → resetTimeout
            if (this._resetTimeout) {
                this._resetTimeout();
            }

            if (!response.ok) {
                throw new Error(`API failed: ${response.status}`);
            }

            return response;
        } catch (error) {
            // Lỗi → ném cho runWithRetry retry
            throw error;
        }
    }

    async get(url, requestBody, contentType = 'application/json', headers = {}, isBasicAuth = true) {
        return await this.request('GET', url, requestBody, contentType, headers, isBasicAuth);
    }

    async post(url, requestBody, contentType = 'application/json', headers = {}, isBasicAuth = true) {
        return await this.request('POST', url, requestBody, contentType, headers, isBasicAuth);
    }

    getHtml = async (url) => {
        try {
            Tester.console.log(url);
            const response = await Tester.api.get(url, null, 'text/html; charset=UTF-8', {
                "X-PJAX": "true",
                "X-PJAX-Container": "#pjaxContainer",
                "X-Requested-With": "XMLHttpRequest"

            }, false);

            const html = await response.text();

            return html;
        } catch (error) {
            Tester.console.error('Api.getHtml', error);
            return null;
        }
    }
}

window.ClassProvider.Api = Api;