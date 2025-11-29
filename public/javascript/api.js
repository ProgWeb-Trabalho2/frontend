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
        const headers = Object.assign({ "Content-Type": "application/json" }, (options.headers || {}));
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const res = yield fetch(API_URL + endpoint, Object.assign(Object.assign({}, options), { headers }));
        return res.json();
    });
}
//# sourceMappingURL=api.js.map