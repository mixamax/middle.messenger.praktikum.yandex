import constants from "../constants";

export enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

type Options = {
    method?: METHODS;
    headers?: { [key: string]: string };
    timeout?: number;
    data?: any;
};
type Data = { [key: string]: string };

function queryStringify(data: Data) {
    let result = "?";
    for (let key in data) {
        result = result + `${key}=${data[key]}` + `&`;
    }
    const corr = result.slice(0, -1).replace(" ", "0");
    return corr;
}
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => {
        return this.request(
            `${constants.HOST}${url}`,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };
    post: HTTPMethod = (url, options = {}) => {
        return this.request(
            `${constants.HOST}${url}`,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };
    put: HTTPMethod = (url, options = {}) => {
        return this.request(
            `${constants.HOST}${url}`,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };
    delete: HTTPMethod = (url, options = {}) => {
        return this.request(
            `${constants.HOST}${url}`,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    request = (url: string, options: Options, timeout = 5000) => {
        const { headers, data, method } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === METHODS.GET) {
                url = url + queryStringify(data);
            }
            const method2 = String(method);
            xhr.open(method2, url);

            xhr.onload = function () {
                resolve(xhr);
            };
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
            xhr.withCredentials = true;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
            xhr.timeout = timeout;
        });
    };
}
console.log(queryStringify({ a: "1", b: "2 2" }));
