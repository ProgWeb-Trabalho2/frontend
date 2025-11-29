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
    const token = localStorage.getItem("accessToken");
    if (!token)
        return 0;
    try {
        const [, payloadBase64 = ""] = token.split(".");
        if (!payloadBase64)
            return 0;
        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    }
    catch (_a) {
        return 0;
    }
}
const params = new URLSearchParams(window.location.search);
const gameId = Number(params.get("gameId"));
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = getLoggedUserId();
        if (!userId) {
            alert("Você precisa estar logado.");
            return window.location.href = "login.html";
        }
        const scoreEl = document.getElementById("score");
        const commentEl = document.getElementById("comment");
        if (!scoreEl || !commentEl) {
            console.error("Inputs não encontrados no DOM!");
            return;
        }
        const score = Number(scoreEl.value);
        const comment = commentEl.value;
        yield api(`/reviews/user/${userId}/`, {
            method: "POST",
            body: JSON.stringify({ game_id: gameId, score, comment })
        });
        document.getElementById("msg").innerText =
            "Review criada com sucesso!";
        setTimeout(() => {
            window.location.href = `jogo.html?id=${gameId}`;
        }, 1200);
    });
}
document.getElementById("save-review")
    .addEventListener("click", () => saveReview());
//# sourceMappingURL=review-create.js.map