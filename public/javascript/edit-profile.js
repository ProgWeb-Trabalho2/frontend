var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { backendAddress } from "./constantes.js";
import { api } from "./api.js";
function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("user");
    return param ? Number(param) : null;
}
let selectedAvatarFile = null;
function loadProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield api("/auth/me/");
        const avatarEl = document.getElementById("avatar-preview");
        avatarEl.src = user.avatar || "./images/default-avatar.png";
        const bioInput = document.getElementById("bio-input");
        bioInput.value = user.bio || "";
    });
}
function handleAvatarChange(e) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        selectedAvatarFile = file;
        const preview = document.getElementById("avatar-preview");
        preview.src = URL.createObjectURL(file);
    });
}
function handleSaveProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const msgEl = document.getElementById("status-msg");
        msgEl.innerText = "Salvando...";
        const bio = document.getElementById("bio-input").value;
        yield api("/auth/me/", {
            method: "PATCH",
            body: JSON.stringify({ bio }),
        });
        if (selectedAvatarFile) {
            const formData = new FormData();
            formData.append("avatar", selectedAvatarFile);
            yield api("/auth/me/", {
                method: "PATCH",
                body: formData,
            });
        }
        msgEl.innerText = "Perfil atualizado com sucesso!";
        setTimeout(loadProfile, 1000);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    (_a = document.getElementById("avatar-input")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", handleAvatarChange);
    (_b = document.getElementById("save-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleSaveProfile);
    loadProfile();
});
//# sourceMappingURL=edit-profile.js.map