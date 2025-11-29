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
function getLoggedUserId() {
    var _a;
    const token = localStorage.getItem("accessToken");
    if (!token)
        return 0;
    try {
        const parts = token.split('.');
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
function loadGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("../data/games.json");
        const games = yield res.json();
        const select = document.getElementById("game-select");
        games.forEach((game) => {
            const opt = document.createElement("option");
            opt.value = game.id.toString();
            opt.textContent = game.name;
            select.appendChild(opt);
        });
    });
}
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = getLoggedUserId();
        if (!userId) {
            alert("Usuário não autenticado!");
            return window.location.href = "login.html";
        }
        const game = document.getElementById("game-select").value;
        const score = Number(document.getElementById("score").value);
        const comment = document.getElementById("comment").value;
        yield api(`/reviews/user/${userId}/`, {
            method: "POST",
            body: JSON.stringify({ game_id: Number(game), score, comment })
        });
        document.getElementById("msg").innerText = "Review criada com sucesso!";
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    });
}
document.getElementById("save-review").addEventListener("click", saveReview);
loadGames();
//# sourceMappingURL=review-create.js.map