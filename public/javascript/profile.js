var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { backendAddress } from "./constantes.js";
import { api } from "./api.js";
import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";
function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("user");
    return param ? Number(param) : null;
}
function getLoggedUserId() {
    var _a;
    const token = localStorage.getItem("accessToken");
    if (!token)
        return 0;
    try {
        const parts = token.split(".");
        const payloadBase64 = (_a = parts === null || parts === void 0 ? void 0 : parts[1]) !== null && _a !== void 0 ? _a : "";
        if (!payloadBase64)
            return 0;
        const payload = JSON.parse(atob(payloadBase64));
        return Number(payload.user_id) || 0;
    }
    catch (_b) {
        return 0;
    }
}
function loadProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const urlUserId = getUserIdFromURL();
        const loggedId = getLoggedUserId();
        const isOwnProfile = !urlUserId || urlUserId === loggedId;
        const userIdToLoad = isOwnProfile ? loggedId : urlUserId;
        const endpoint = isOwnProfile ? "/auth/me/" : `/auth/user/${userIdToLoad}/`;
        const result = yield api(endpoint);
        if (!result.username) {
            return (window.location.href = "login.html");
        }
        document.getElementById("avatar").src =
            result.avatar || "./images/default-avatar.png";
        document.getElementById("username").innerText =
            result.username;
        document.getElementById("bio").innerText =
            result.bio || "Sem biografia.";
        updateEditProfileButton(isOwnProfile);
        loadReviews(userIdToLoad, isOwnProfile);
    });
}
function updateEditProfileButton(isOwnProfile) {
    const editProfileButton = document.querySelector('a.btn-primary[href="edit-profile.html"]');
    if (editProfileButton) {
        editProfileButton.style.display = isOwnProfile ? "inline-block" : "none";
    }
}
function loadReviews(userId, canEdit) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const container = document.querySelector(".profile-reviews");
        container.innerHTML = "<h2>Reviews Recentes</h2>";
<<<<<<< HEAD
        const reviews = yield api(`/reviews/user/${userId}/`, {
            method: "GET",
        });
=======
        const reviews = yield api(`/reviews/user/${userId}/`);
>>>>>>> feature/jogos
        if (!Array.isArray(reviews) || reviews.length === 0) {
            container.innerHTML += "<p>Nenhuma review encontrada.</p>";
            return;
        }
<<<<<<< HEAD
        reviews.forEach((r) => __awaiter(this, void 0, void 0, function* () {
            const game = yield fetchGame(r.game_id.toString());
            if (!game)
                return;
            console.log(game);
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
            <img class="review-img" src="${game.coverUrl}" alt="Jogo">
            <div class="review-content">
                <div class="review-header">
                    <h3>${game.name}</h3>
=======
        for (const r of reviews) {
            const gameRes = yield fetch(`${backendAddress}/api/games/search-by-id/${r.game_id}/`);
            const gameData = yield gameRes.json();
            const game = gameData[0];
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
            <img class="review-img" src="${(_a = r.game.cover) !== null && _a !== void 0 ? _a : './images/game-placeholder.jpg'}" alt="${game.name}">
            <div class="review-content">
                <div class="review-header">
                    <h3>${r.game.name}</h3>
>>>>>>> feature/jogos
                    <span class="review-score">⭐ ${r.score}/10</span>
                </div>
                <p>${r.comment}</p>
                ${canEdit
                ? `
                <div class="review-actions">
                    <span class="icon edit-btn" data-review-id="${r.id}">✏️</span>
                    <span class="icon delete-btn" data-review-id="${r.id}">❌</span>
                </div>`
                : ""}
            </div>
        `;
            container.appendChild(card);
<<<<<<< HEAD
        }));
=======
        }
>>>>>>> feature/jogos
        if (canEdit)
            addReviewActions();
    });
}
function addReviewActions() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const id = btn.dataset.reviewId;
            yield api(`/reviews/${id}/`, { method: "DELETE" });
            loadProfile();
        }));
    });
    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.reviewId;
            localStorage.setItem("editReviewId", id);
            window.location.href = "edit-review.html";
        });
    });
}
function fetchGame(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(backendAddress + "games/search-by-id/" + id);
        if (!response.ok)
            return;
        const data = yield response.json();
        return new Game(data[0]);
    });
}
// Delegação: adiciona 1 listener global que lida com todos os botões
document.addEventListener("click", (ev) => {
    const target = ev.target;
    if (!target)
        return;
    // Se o click for em um filho do botão (ex: emoji/text node), procuramos o elemento pai com a classe
    const editBtn = target.closest(".edit-btn");
    if (editBtn) {
        const id = editBtn.dataset.reviewId;
        if (!id)
            return console.warn("edit-btn sem data-review-id");
        localStorage.setItem("editReviewId", id);
        window.location.href = "edit-review.html";
        return;
    }
    const deleteBtn = target.closest(".delete-btn");
    if (deleteBtn) {
        const id = deleteBtn.dataset.reviewId;
        if (!id)
            return console.warn("delete-btn sem data-review-id");
        // confirmação opcional
        if (!confirm("Deseja remover esta review?"))
            return;
        api(`/reviews/${id}/`, { method: "DELETE" })
            .then(() => loadProfile())
            .catch((err) => console.error("Erro ao deletar:", err));
        return;
    }
});
onload = () => {
    loadProfile();
};
//# sourceMappingURL=profile.js.map