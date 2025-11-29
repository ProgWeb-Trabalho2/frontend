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
function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
}
function loadGame() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const id = getGameIdFromURL();
        const game = yield api(`games/search-by-id/${id}/`);
        document.getElementById("cover").src =
            ((_a = game.cover) === null || _a === void 0 ? void 0 : _a.url) || "./images/game-placeholder.jpg";
        document.getElementById("name").innerText = game.name;
        document.getElementById("releaseDate").innerText =
            game.first_release_date ? `Lançamento: ${game.first_release_date}` : "";
        document.getElementById("genres").innerText =
            ((_b = game.genres) === null || _b === void 0 ? void 0 : _b.map((g) => g.name).join(", ")) || "";
        document.getElementById("summary").innerText =
            game.summary || "Sem descrição deste jogo disponível.";
        (_c = document.getElementById("create-review-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            window.location.href = `review-create.html?game=${id}`;
        });
        yield loadGameReviews(id);
    });
}
function loadGameReviews(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield api(`reviews/game/${gameId}/`);
        const container = document.getElementById("game-reviews");
        container.innerHTML = "<h2>Reviews</h2>";
        if (!reviews.length) {
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