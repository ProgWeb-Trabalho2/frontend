import { api } from "./api.js";
import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";

const params = new URLSearchParams(window.location.search);
const gameID = params.get("id");

function getLoggedUserId(): number {
  const token = localStorage.getItem("accessToken");
  if (!token) return 0;

  try {
    const parts = token.split(".");
    const payloadBase64 = parts?.[1] ?? "";
    if (!payloadBase64) return 0;

    const payload = JSON.parse(atob(payloadBase64));
    return Number(payload.user_id) || 0;
  } catch {
    return 0;
  }
}

async function fetchGame(id: string) {
  const response = await fetch(backendAddress + "games/search-by-id/" + id);

  if (!response.ok) return;

  const data = await response.json();
  return new Game(data[0]);
}

async function loadGame() {
  if (!gameID) return;

  const game = await fetchGame(gameID?.toString());
  if (!game) return;
  console.log(game);

  document.getElementById("game-select")!.textContent = game.name;
}

async function saveReview() {
  const userId = getLoggedUserId();
  if (!userId) {
    alert("Usuário não autenticado!");
    return (window.location.href = "login.html");
  }

  const score = Number(
    (document.getElementById("score") as HTMLInputElement).value
  );
  const comment = (document.getElementById("comment") as HTMLTextAreaElement)
    .value;

  await api(`/reviews/user/${userId}/`, {
    method: "POST",
    body: JSON.stringify({ game_id: gameID, score, comment }),
  });

  (document.getElementById("msg") as HTMLElement).innerText =
    "Review criada com sucesso!";

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 1000);
}

document.getElementById("save-review")!.addEventListener("click", saveReview);
loadGame();
