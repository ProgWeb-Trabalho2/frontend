import { api, setAccessToken } from "./api.js";

async function loadProfile() {
    const res = await api("/auth/me/");

    if (!res.username) {
        return window.location.href = "login.html";
    }

    (document.getElementById("avatar-preview") as HTMLImageElement).src =
        res.avatar || "./images/default-avatar.png";

    (document.getElementById("bio-input") as HTMLTextAreaElement).value =
        res.bio || "";
}

async function saveProfile() {
    const avatarInput = document.getElementById("avatar-input") as HTMLInputElement;
    const bioInput = document.getElementById("bio-input") as HTMLTextAreaElement;

    const formData = new FormData();
    formData.append("bio", bioInput.value);

    if (avatarInput.files && avatarInput.files[0]) {
        formData.append("avatar", avatarInput.files[0]);
    }

    const res = await fetch("http://localhost:8000/api/auth/me/", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData
    });

    if (res.ok) {
        document.getElementById("status-msg")!.textContent = "Perfil atualizado!";
        loadProfile();
    } else {
        document.getElementById("status-msg")!.textContent = "Erro ao salvar.";
    }
}

document.getElementById("save-btn")!.addEventListener("click", saveProfile);
loadProfile();
