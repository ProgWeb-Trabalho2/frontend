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
import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";
const params = new URLSearchParams(window.location.search);
const gameID = params.get("id");
function getLoggedUserId() {
    const token = localStorage.getItem("accessToken");
    if (!token)
        return 0;
    try {
<<<<<<< HEAD
        const parts = token.split(".");
        const payloadBase64 = (_a = parts === null || parts === void 0 ? void 0 : parts[1]) !== null && _a !== void 0 ? _a : "";
=======
        const [, payloadBase64 = ""] = token.split(".");
>>>>>>> feature/jogos
        if (!payloadBase64)
            return 0;
        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    }
    catch (_a) {
        return 0;
    }
}
<<<<<<< HEAD
function fetchGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(backendAddress + "games/search-by-id/" + id);
        if (!response.ok)
            return;
        const data = yield response.json();
        return new Game(data[0]);
    });
}
function loadGame() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!gameID)
            return;
        const game = yield fetchGame(gameID === null || gameID === void 0 ? void 0 : gameID.toString());
        if (!game)
            return;
        console.log(game);
        document.getElementById("game-select").textContent = game.name;
    });
}
=======
const params = new URLSearchParams(window.location.search);
const gameId = Number(params.get("gameId"));
>>>>>>> feature/jogos
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = getLoggedUserId();
        if (!userId) {
<<<<<<< HEAD
            alert("Usuário não autenticado!");
            return (window.location.href = "login.html");
        }
        const score = Number(document.getElementById("score").value);
        const comment = document.getElementById("comment")
            .value;
        yield api(`/reviews/user/${userId}/`, {
            method: "POST",
            body: JSON.stringify({ game_id: gameID, score, comment }),
=======
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
>>>>>>> feature/jogos
        });
        document.getElementById("msg").innerText =
            "Review criada com sucesso!";
        setTimeout(() => {
            window.location.href = `jogo.html?id=${gameId}`;
        }, 1200);
    });
}
<<<<<<< HEAD
document.getElementById("save-review").addEventListener("click", saveReview);
loadGame();
=======
document.getElementById("save-review")
    .addEventListener("click", () => saveReview());
>>>>>>> feature/jogos
//# sourceMappingURL=review-create.js.map