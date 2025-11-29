import { api } from "./api.js";

function getGameIdFromURL(): number {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
}

async function loadGame() {
    const id = getGameIdFromURL();
    const game = await api(`games/search-by-id/${id}/`);

    (document.getElementById("cover") as HTMLImageElement).src =
        game.cover?.url || "./images/game-placeholder.jpg";
    (document.getElementById("name") as HTMLElement).innerText = game.name;
    (document.getElementById("releaseDate") as HTMLElement).innerText =
        game.first_release_date ? `Lançamento: ${game.first_release_date}` : "";
    (document.getElementById("genres") as HTMLElement).innerText =
        game.genres?.map((g: any) => g.name).join(", ") || "";

    (document.getElementById("summary") as HTMLElement).innerText =
        game.summary || "Sem descrição deste jogo disponível.";

    document.getElementById("create-review-btn")?.addEventListener("click", () => {
        window.location.href = `review-create.html?game=${id}`;
    });

    await loadGameReviews(id);
}

async function loadGameReviews(gameId: number) {
    const reviews = await api(`reviews/game/${gameId}/`);

    const container = document.getElementById("game-reviews")!;
    container.innerHTML = "<h2>Reviews</h2>";

    if (!reviews.length) {
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
