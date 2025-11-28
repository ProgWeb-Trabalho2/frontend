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
function loadProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield api("/auth/me/");
        if (!res.username) {
            return window.location.href = "login.html";
        }
        document.getElementById("avatar-preview").src =
            res.avatar || "./images/default-avatar.png";
        document.getElementById("bio-input").value =
            res.bio || "";
    });
}
function saveProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const avatarInput = document.getElementById("avatar-input");
        const bioInput = document.getElementById("bio-input");
        const formData = new FormData();
        formData.append("bio", bioInput.value);
        if (avatarInput.files && avatarInput.files[0]) {
            formData.append("avatar", avatarInput.files[0]);
        }
        const res = yield fetch("http://localhost:8000/api/auth/me/", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: formData
        });
        if (res.ok) {
            document.getElementById("status-msg").textContent = "Perfil atualizado!";
            loadProfile();
        }
        else {
            document.getElementById("status-msg").textContent = "Erro ao salvar.";
        }
    });
}
document.getElementById("save-btn").addEventListener("click", saveProfile);
loadProfile();
//# sourceMappingURL=edit-profile.js.map