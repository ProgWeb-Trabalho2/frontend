var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { api, setAccessToken } from "./api.js";
document
    .getElementById("register-form")
    .addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const username = document.getElementById("username")
        .value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password")
        .value;
    const result = yield api("auth/register/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
    });
    if (result.access) {
        setAccessToken(result.access);
        window.location.href = "profile.html";
    }
    else {
        alert(result.error || "Erro ao cadastrar");
    }
    return false;
}));
//# sourceMappingURL=register.js.map