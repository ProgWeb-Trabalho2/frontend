import { api } from "./api.js";

function getLoggedUserId(): number {
    const token = localStorage.getItem("accessToken");
    if (!token) return 0;

    try {
        const [, payloadBase64 = ""] = token.split(".");
        if (!payloadBase64) return 0;

        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    } catch {
        return 0;
    }
}

const params = new URLSearchParams(window.location.search);
const gameId = Number(params.get("gameId"));

async function saveReview() {
    const userId = getLoggedUserId();
    if (!userId) {
        alert("Você precisa estar logado.");
        return window.location.href = "login.html";
    }

    const scoreEl = document.getElementById("score") as HTMLInputElement;
    const commentEl = document.getElementById("comment") as HTMLTextAreaElement;

    if (!scoreEl || !commentEl) {
        console.error("Inputs não encontrados no DOM!");
        return;
    }

    const score = Number(scoreEl.value);
    const comment = commentEl.value;

    await api(`/reviews/user/${userId}/`, {
        method: "POST",
        body: JSON.stringify({ game_id: gameId, score, comment })
    });

    (document.getElementById("msg") as HTMLElement).innerText =
        "Review criada com sucesso!";

    setTimeout(() => {
        window.location.href = `jogo.html?id=${gameId}`;
    }, 1200);
}

document.getElementById("save-review")!
    .addEventListener("click", () => saveReview());
