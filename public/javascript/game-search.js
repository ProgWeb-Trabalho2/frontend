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
onload = () => {
    const search = document.getElementById("search-bar");
    if (!search)
        return;
    search.addEventListener("keydown", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.key === "Enter") {
            const data = yield searchGame(search.value);
            gameList(data);
        }
    }));
};
function searchGame(game) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(backendAddress + "api/games/search/" + game);
        if (!response.ok)
            return [];
        const data = yield response.json();
        return data.map((game) => new Game(game));
    });
}
function gameList(games) {
    const container = document.getElementById("game-list");
    if (!container)
        return;
    container.innerHTML = "";
    if (games.length == 0) {
        container.textContent = "Nenhum jogo encontrado";
        return;
    }
    games.forEach((game) => {
        var _a, _b, _c;
        const card = document.createElement("div");
        card.classList.add("game-card");
        const image = document.createElement("img");
        console.log(game.coverUrl);
        image.setAttribute("src", (_a = game.coverUrl) !== null && _a !== void 0 ? _a : "");
        image.setAttribute("alt", game.name);
        card.appendChild(image);
        const name = document.createElement("h2");
        name.textContent = game.name;
        card.appendChild(name);
        const releaseDate = document.createElement("p");
        releaseDate.textContent =
            (_c = (_b = game.releaseDate) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "Ano desconhecido";
        card.appendChild(releaseDate);
        const genres = document.createElement("p");
        genres.textContent = game.genres.join(", ");
        card.appendChild(genres);
        const summary = document.createElement("p");
        summary.textContent = game.summary;
        card.appendChild(summary);
        container.appendChild(card);
    });
}
//# sourceMappingURL=game-search.js.map