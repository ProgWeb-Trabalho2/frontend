var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://localhost:8000/api";
let accessToken = localStorage.getItem("accessToken");
export function setAccessToken(token) {
    accessToken = token;
    localStorage.setItem("accessToken", token);
}
export function clearToken() {
    accessToken = null;
    localStorage.removeItem("accessToken");
}
export function api(endpoint_1) {
    return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
        const headers = {};
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                headers[key] = value;
            });
        }
        else if (typeof options.headers === "object" && options.headers !== null) {
            Object.assign(headers, options.headers);
        }
        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const res = yield fetch(API_URL + endpoint, Object.assign(Object.assign({}, options), { headers }));
        if (res.status === 401) {
            clearToken();
            window.location.href = "login.html";
            throw new Error("Unauthorized");
        }
        if (!res.ok) {
            const text = yield res.text();
            console.error("API Error:", text);
            throw new Error(`HTTP ${res.status}`);
        }
        try {
            return yield res.json();
        }
        catch (_a) {
            return null;
        }
    });
}
//# sourceMappingURL=api.js.map