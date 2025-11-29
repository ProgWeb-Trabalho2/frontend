import { api } from "./api.js";
import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";

function getUserIdFromURL(): number | null {
  const params = new URLSearchParams(window.location.search);
  const param = params.get("user");
  return param ? Number(param) : null;
}

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

async function loadProfile() {
  const urlUserId = getUserIdFromURL();
  const loggedId = getLoggedUserId();
  const isOwnProfile = !urlUserId || urlUserId === loggedId;

  const userIdToLoad = isOwnProfile ? loggedId : urlUserId!;

  const endpoint = isOwnProfile ? "/auth/me/" : `/auth/user/${userIdToLoad}/`;

  const result = await api(endpoint);

  if (!result.username) {
    return (window.location.href = "login.html");
  }

  (document.getElementById("avatar") as HTMLImageElement).src =
    result.avatar || "./images/default-avatar.png";
  (document.getElementById("username") as HTMLElement).innerText =
    result.username;
  (document.getElementById("bio") as HTMLElement).innerText =
    result.bio || "Sem biografia.";

  updateEditProfileButton(isOwnProfile);
  loadReviews(userIdToLoad, isOwnProfile);
}

function updateEditProfileButton(isOwnProfile: boolean) {
  const editProfileButton = document.querySelector(
    'a.btn-primary[href="edit-profile.html"]'
  ) as HTMLElement;

  if (editProfileButton) {
    editProfileButton.style.display = isOwnProfile ? "inline-block" : "none";
  }
}

async function loadReviews(userId: number, canEdit: boolean) {
  const container = document.querySelector(".profile-reviews") as HTMLElement;
  container.innerHTML = "<h2>Reviews Recentes</h2>";

  const reviews = await api(`/reviews/user/${userId}/`, {
    method: "GET",
  });

  if (!Array.isArray(reviews) || reviews.length === 0) {
    container.innerHTML += "<p>Nenhuma review encontrada.</p>";
    return;
  }

  reviews.forEach(async (r: any) => {
    const game = await fetchGame(r.game_id.toString());

    if (!game) return;

    console.log(game);

    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
            <img class="review-img" src="${game.coverUrl}" alt="Jogo">
            <div class="review-content">
                <div class="review-header">
                    <h3>${game.name}</h3>
                    <span class="review-score">⭐ ${r.score}/10</span>
                </div>
                <p>${r.comment}</p>
                ${
                  canEdit
                    ? `
                <div class="review-actions">
                    <span class="icon edit-btn" data-review-id="${r.id}">✏️</span>
                    <span class="icon delete-btn" data-review-id="${r.id}">❌</span>
                </div>`
                    : ""
                }
            </div>
        `;
    container.appendChild(card);
  });

  if (canEdit) addReviewActions();
}

function addReviewActions() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = (btn as HTMLElement).dataset.reviewId!;
      await api(`/reviews/${id}/`, { method: "DELETE" });
      loadProfile();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = (btn as HTMLElement).dataset.reviewId!;
      localStorage.setItem("editReviewId", id);
      window.location.href = "edit-review.html";
    });
  });
}

async function fetchGame(id: string) {
  const response = await fetch(backendAddress + "games/search-by-id/" + id);

  if (!response.ok) return;

  const data = await response.json();
  return new Game(data[0]);
}

// Delegação: adiciona 1 listener global que lida com todos os botões
document.addEventListener("click", (ev) => {
  const target = ev.target as HTMLElement | null;
  if (!target) return;

  // Se o click for em um filho do botão (ex: emoji/text node), procuramos o elemento pai com a classe
  const editBtn = target.closest(".edit-btn") as HTMLElement | null;
  if (editBtn) {
    const id = editBtn.dataset.reviewId;
    if (!id) return console.warn("edit-btn sem data-review-id");
    localStorage.setItem("editReviewId", id);
    window.location.href = "edit-review.html";
    return;
  }

  const deleteBtn = target.closest(".delete-btn") as HTMLElement | null;
  if (deleteBtn) {
    const id = deleteBtn.dataset.reviewId;
    if (!id) return console.warn("delete-btn sem data-review-id");
    // confirmação opcional
    if (!confirm("Deseja remover esta review?")) return;
    api(`/reviews/${id}/`, { method: "DELETE" })
      .then(() => loadProfile())
      .catch((err) => console.error("Erro ao deletar:", err));
    return;
  }
});

onload = () => {
  loadProfile();
};
