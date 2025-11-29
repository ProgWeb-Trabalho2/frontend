import { api } from "./api.js";

function getLoggedUserId(): number {
    const token = localStorage.getItem("accessToken");
    if (!token) return 0;

    try {
        const parts = token.split('.');
        const payloadBase64 = parts?.[1] ?? "";
        if (!payloadBase64) return 0;

        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    } catch {
        return 0;
    }
}

async function loadReview() {
    const reviewId = localStorage.getItem("editReviewId");
    if (!reviewId) return window.location.href = "profile.html";

    const review = await api(`/reviews/${reviewId}/`);
    const gamesRes = await fetch("./data/games.json");
    const games = await gamesRes.json();

    const gameName = games.find((g: any) => g.id === review.game_id)?.name || "Jogo desconhecido";
    (document.getElementById("game-name") as HTMLElement).innerText = gameName;

    (document.getElementById("score") as HTMLInputElement).value = review.score.toString();
    (document.getElementById("comment") as HTMLTextAreaElement).value = review.comment;
}

async function saveReview() {
    const reviewId = localStorage.getItem("editReviewId");
    const loggedId = getLoggedUserId();
    if (!reviewId || !loggedId) return;

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

document.getElementById("save-edit")!.addEventListener("click", saveReview);
loadReview();
