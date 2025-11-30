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
import { Game } from "./Game.js";
function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
}
function loadGame() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = getGameIdFromURL();
        const response = yield fetch(`${backendAddress}/api/games/search-by-id/${id}/`);
        const games = yield response.json();
        const game = new Game(games[0]);
        document.getElementById("cover").src =
            game.coverUrl || "./images/game-placeholder.jpg";
        document.getElementById("name").innerText = game.name;
        document.getElementById("releaseDate").innerText =
            game.releaseDate ? `Lançamento: ${game.releaseDate}` : "";
        document.getElementById("genres").innerText =
            game.genres.join(", ");
        document.getElementById("summary").innerText =
            game.summary || "Sem descrição deste jogo disponível.";
        (_a = document
            .getElementById("create-review-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            window.location.href = `create-review.html?game=${id}`;
        });
        yield loadGameReviews(id);
    });
}
function loadGameReviews(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${backendAddress}api/reviews/game/${gameId}/`);
        const reviews = yield response.json();
        const container = document.getElementById("game-reviews");
        container.innerHTML = "<h2>Reviews</h2>";
        if (!reviews) {
            container.innerHTML += "<p>Este jogo ainda não possui reviews.</p>";
            return;
        }
        reviews.forEach((review) => {
            const div = document.createElement("div");
            div.className = "review-card";
            div.innerHTML = `
            <p><strong>${review.user_username}</strong> avaliou:</p>
            <p>⭐ ${review.score}/10</p>
            <p>${review.comment}</p>
        `;
            container.appendChild(div);
        });
    });
}
loadGame();
//# sourceMappingURL=game-page.js.map