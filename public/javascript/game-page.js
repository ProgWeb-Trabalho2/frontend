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
const params = new URLSearchParams(window.location.search);
const gameID = params.get("id");
onload = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("carregou");
    if (!gameID)
        return;
    const game = yield fetchGame(gameID);
    if (!game)
        return;
    console.log(game);
    document.getElementById("title").textContent = game.name;
    document.getElementById("name").textContent = game.name;
    const image = document.getElementById("cover");
    image.src = (_a = game.coverUrl) !== null && _a !== void 0 ? _a : "";
    document.getElementById("releaseDate").textContent = game.releaseDate;
    document.getElementById("summary").textContent = game.summary;
});
function fetchGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(backendAddress + "games/search-by-id/" + id);
        if (!response.ok)
            return;
        const data = yield response.json();
        return new Game(data[0]);
    });
}
//# sourceMappingURL=game-page.js.map