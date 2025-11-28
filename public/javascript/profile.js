var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { api } from "./api.js";
function loadProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield api("/auth/me/");
        if (result.username) {
            document.getElementById("profile-info").innerHTML = `
            <p><strong>Usuário:</strong> ${result.username}</p>
            <p><strong>Email:</strong> ${result.email}</p>
        `;
        }
        else {
            window.location.href = "login.html";
        }
    });
}
loadProfile();
//# sourceMappingURL=profile.js.map