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
const searchInput = document.getElementById("search-bar");
const gameList = document.getElementById("game-list");
function createCard(game) {
    var _a, _b, _c;
    const div = document.createElement("div");
    div.className = "game-card";
    const coverUrl = ((_b = (_a = game.cover) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.replace("t_thumb", "t_cover_big")) ||
        "./images/game-placeholder.jpg";
    div.innerHTML = `
        <img src="${coverUrl}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>${((_c = game.genres) === null || _c === void 0 ? void 0 : _c.map((g) => g.name).join(", ")) || "Sem gênero"}</p>
    `;
    div.addEventListener("click", () => {
        window.location.href = `jogo.html?id=${game.id}`;
    });
    return div;
}
function searchGame(searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchTerm.trim()) {
            gameList.innerHTML = "";
            return;
        }
        const url = `${backendAddress}api/games/search/${encodeURIComponent(searchTerm)}/`;
        try {
            const response = yield fetch(url);
            if (!response.ok)
                throw new Error("Erro ao buscar jogos");
            const games = yield response.json();
            gameList.innerHTML = "";
            if (!games.length) {
                gameList.innerHTML = "<p>Nenhum jogo encontrado</p>";
                return;
            }
            games.forEach((game) => {
                const card = createCard(game);
                gameList.appendChild(card);
            });
        }
        catch (err) {
            console.error("Erro na busca de jogos:", err);
        }
    });
}
searchInput.addEventListener("input", () => {
    searchGame(searchInput.value);
});
//# sourceMappingURL=game-search.js.map