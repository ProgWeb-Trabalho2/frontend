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
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = getLoggedUserId();
        if (!userId) {
            alert("Usuário não autenticado!");
            return (window.location.href = "login.html");
        }
        const score = Number(document.getElementById("score").value);
        const comment = document.getElementById("comment")
            .value;
        yield api(`/reviews/user/${userId}/`, {
            method: "POST",
            body: JSON.stringify({ game_id: gameID, score, comment }),
        });
        document.getElementById("msg").innerText =
            "Review criada com sucesso!";
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    });
}
document.getElementById("save-review").addEventListener("click", saveReview);
loadGame();
//# sourceMappingURL=review-create.js.map