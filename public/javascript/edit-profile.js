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
function loadReview() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const reviewId = localStorage.getItem("editReviewId");
        if (!reviewId)
            return window.location.href = "profile.html";
        const review = yield api(`/reviews/${reviewId}/`);
        const gamesRes = yield fetch("./data/games.json");
        const games = yield gamesRes.json();
        const gameName = ((_a = games.find((g) => g.id === review.game_id)) === null || _a === void 0 ? void 0 : _a.name) || "Jogo desconhecido";
        document.getElementById("game-name").innerText = gameName;
        document.getElementById("score").value = review.score.toString();
        document.getElementById("comment").value = review.comment;
    });
}
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewId = localStorage.getItem("editReviewId");
        const loggedId = getLoggedUserId();
        if (!reviewId || !loggedId)
            return;
        const score = Number(document.getElementById("score").value);
        const comment = document.getElementById("comment").value;
        yield api(`/reviews/${reviewId}/`, {
            method: "PATCH",
            body: JSON.stringify({ score, comment })
        });
        document.getElementById("msg").innerText = "Alterações salvas com sucesso!";
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    });
}
document.getElementById("save-edit").addEventListener("click", saveReview);
loadReview();
//# sourceMappingURL=edit-profile.js.map