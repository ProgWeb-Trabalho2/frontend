import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";

function getGameIdFromURL(): number {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

async function loadGame() {
  const id = getGameIdFromURL();
  const response = await fetch(
    `${backendAddress}/api/games/search-by-id/${id}/`
  );

  const games = await response.json();
  const game = new Game(games[0]);

  (document.getElementById("cover") as HTMLImageElement).src =
    game.coverUrl || "./images/game-placeholder.jpg";
  (document.getElementById("name") as HTMLElement).innerText = game.name;
  (document.getElementById("releaseDate") as HTMLElement).innerText =
    game.releaseDate ? `Lançamento: ${game.releaseDate}` : "";
  (document.getElementById("genres") as HTMLElement).innerText =
    game.genres.join(", ");

  (document.getElementById("summary") as HTMLElement).innerText =
    game.summary || "Sem descrição deste jogo disponível.";

  document
    .getElementById("create-review-btn")
    ?.addEventListener("click", () => {
      window.location.href = `create-review.html?game=${id}`;
    });

  await loadGameReviews(id);
}

async function loadGameReviews(gameId: number) {
  const response = await fetch(`${backendAddress}api/reviews/game/${gameId}/`);
  const reviews = await response.json();

  const container = document.getElementById("game-reviews")!;
  container.innerHTML = "<h2>Reviews</h2>";

  if (!reviews) {
    container.innerHTML += "<p>Este jogo ainda não possui reviews.</p>";
    return;
  }

  reviews.forEach((review: any) => {
    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `
            <p><strong>${review.user_username}</strong> avaliou:</p>
            <p>⭐ ${review.score}/10</p>
            <p>${review.comment}</p>
        `;
    container.appendChild(div);
  });
}

loadGame();
