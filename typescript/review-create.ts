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

async function loadGames() {
    const res = await fetch("../data/games.json");
    const games = await res.json();

    const select = document.getElementById("game-select") as HTMLSelectElement;
    games.forEach((game: any) => {
        const opt = document.createElement("option");
        opt.value = game.id.toString();
        opt.textContent = game.name;
        select.appendChild(opt);
    });
}

async function saveReview() {
    const userId = getLoggedUserId();
    if (!userId) {
        alert("Usuário não autenticado!");
        return window.location.href = "login.html";
    }

    const game = (document.getElementById("game-select") as HTMLSelectElement).value;
    const score = Number((document.getElementById("score") as HTMLInputElement).value);
    const comment = (document.getElementById("comment") as HTMLTextAreaElement).value;

    await api(`/reviews/user/${userId}/`, {
        method: "POST",
        body: JSON.stringify({ game_id: Number(game), score, comment })
    });

    (document.getElementById("msg") as HTMLElement).innerText = "Review criada com sucesso!";

    setTimeout(() => {
        window.location.href = "profile.html";
    }, 1000);
}

document.getElementById("save-review")!.addEventListener("click", saveReview);
loadGames();
