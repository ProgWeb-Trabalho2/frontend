import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";

onload = () => {
  const search = document.getElementById(
    "search-bar"
  ) as HTMLInputElement | null;

  if (!search) return;

  search.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const data = await searchGame(search.value);
      gameList(data);
    }
  });
};

async function searchGame(game: string) {
  const response = await fetch(backendAddress + "games/search/" + game);

  if (!response.ok) return [];

  const data = await response.json();
  return data.map((game: any) => new Game(game));
}

function gameList(games: Game[]) {
  const container = document.getElementById("game-list");

  if (!container) return;

  container.innerHTML = "";

  if (games.length == 0) {
    container.textContent = "Nenhum jogo encontrado";
    return;
  }

  games.forEach((game) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    const image = document.createElement("img");
    console.log(game.coverUrl);
    image.setAttribute(
      "src",
      game.coverUrl ??
        "https://imgs.search.brave.com/BaS4dh47kFbNcPDIyHobtgf74cJm7WlINvy-fe8wJ2U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvbm90LWZv/dW5kLWlsbHVzdHJh/dGlvbi1zdmctZG93/bmxvYWQtcG5nLTkx/NjA2MDEucG5n"
    );
    image.setAttribute("alt", game.name);
    card.appendChild(image);

    const name = document.createElement("h2");
    name.textContent = game.name;
    card.appendChild(name);

    const releaseDate = document.createElement("p");
    releaseDate.textContent =
      game.releaseDate?.toString() ?? "Ano desconhecido";
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
