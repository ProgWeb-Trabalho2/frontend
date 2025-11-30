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
function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("user");
    return param ? Number(param) : null;
}
function getLoggedUserId() {
    var _a;
    const token = localStorage.getItem("accessToken");
    if (!token)
        return 0;
    try {
        const parts = token.split(".");
        const payloadBase64 = (_a = parts === null || parts === void 0 ? void 0 : parts[1]) !== null && _a !== void 0 ? _a : "";
        if (!payloadBase64)
            return 0;
        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    }
    catch (_b) {
        return 0;
    }
}
function saveProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = localStorage.getItem("accessToken");
        const bio = document.getElementById("bio-input")
            .value;
        const avatar = (_a = document.getElementById("avatar-input")
            .files) === null || _a === void 0 ? void 0 : _a[0];
        const formData = new FormData();
        formData.append("bio", bio);
        if (avatar)
            formData.append("avatar", avatar);
        const response = yield fetch(backendAddress + "api/auth/me/", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = yield response.json();
        document.getElementById("status-msg").textContent = "Perfil atualizado";
        return data;
    });
}
onload = () => {
    document.getElementById("save-edit").addEventListener("click", saveProfile);
    const input = document.getElementById("avatar-input");
    const preview = document.getElementById("avatar-preview");
    input.addEventListener("change", () => {
        var _a;
        if ((_a = input.files) === null || _a === void 0 ? void 0 : _a[0]) {
            preview.src = URL.createObjectURL(input.files[0]);
        }
    });
};
//# sourceMappingURL=edit-profile.js.map