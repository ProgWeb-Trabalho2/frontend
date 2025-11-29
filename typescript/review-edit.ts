import { api } from "./api.js";

async function loadReview() {
    const reviewId = localStorage.getItem("editReviewId");
    if (!reviewId) return window.location.href = "profile.html";

    const review = await api(`/reviews/${reviewId}/`);

    (document.getElementById("score") as HTMLInputElement).value = review.score;
    (document.getElementById("comment") as HTMLTextAreaElement).value = review.comment;

    const gameRes = await fetch(`http://localhost:8000/api/games/search-by-id/${review.game_id}/`);
    const data = await gameRes.json();
    const game = data[0];

    (document.getElementById("game-name") as HTMLElement).innerText = game.name;
}

async function saveReview() {
    const reviewId = localStorage.getItem("editReviewId");
    if (!reviewId) return;

    const score = Number((document.getElementById("score") as HTMLInputElement).value);
    const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;

    await api(`/reviews/${reviewId}/`, {
        method: "PATCH",
        body: JSON.stringify({ score, comment })
    });

    (document.getElementById("msg") as HTMLElement).innerText = "Alterações salvas com sucesso!";

    setTimeout(() => {
        window.location.href = "profile.html";
    }, 1000);
}

document.getElementById("save-edit")!
    .addEventListener("click", saveReview);

loadReview();
