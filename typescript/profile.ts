import { api } from "./api.js";

async function loadProfile() {
    const result = await api("/auth/me/");

    if (!result.username) {
        return window.location.href = "login.html";
    }

    (document.getElementById("avatar") as HTMLImageElement).src =
        result.avatar || "./images/default-avatar.png";

    (document.getElementById("username") as HTMLElement).innerText =
        result.username;

    (document.getElementById("email") as HTMLElement).innerText =
        `Email: ${result.email}`;

    (document.getElementById("bio") as HTMLElement).innerText =
        result.bio || "Sem biografia.";
}

loadProfile();
