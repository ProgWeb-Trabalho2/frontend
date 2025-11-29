import { backendAddress } from "./constantes.js";

const searchInput = document.getElementById("search-bar") as HTMLInputElement;
const gameList = document.getElementById("game-list") as HTMLDivElement;

function createCard(game: any) {
    const div = document.createElement("div");
    div.className = "game-card";

    const coverUrl =
        game.cover?.url?.replace("t_thumb", "t_cover_big") ||
        "./images/game-placeholder.jpg";

    div.innerHTML = `
        <img src="${coverUrl}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p>${game.genres?.map((g: any) => g.name).join(", ") || "Sem gênero"}</p>
    `;

    div.addEventListener("click", () => {
        window.location.href = `jogo.html?id=${game.id}`;
    });

    return div;
}

async function searchGame(searchTerm: string) {
    if (!searchTerm.trim()) {
        gameList.innerHTML = "";
        return;
    }

    const url = `${backendAddress}api/games/search/${encodeURIComponent(searchTerm)}/`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar jogos");

        const games = await response.json();

        gameList.innerHTML = "";

        if (!games.length) {
            gameList.innerHTML = "<p>Nenhum jogo encontrado</p>";
            return;
        }

        games.forEach((game: any) => {
            const card = createCard(game);
            gameList.appendChild(card);
        });

    } catch (err) {
        console.error("Erro na busca de jogos:", err);
    }
}

searchInput.addEventListener("input", () => {
    searchGame(searchInput.value);
});
