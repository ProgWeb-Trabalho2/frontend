import { api } from "./api.js";

let selectedAvatarFile: File | null = null;

async function loadProfile() {
    const user = await api("/auth/me/");

    const avatarEl = document.getElementById("avatar-preview") as HTMLImageElement;
    avatarEl.src = user.avatar || "./images/default-avatar.png";

    const bioInput = document.getElementById("bio-input") as HTMLTextAreaElement;
    bioInput.value = user.bio || "";
}

async function handleAvatarChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    selectedAvatarFile = file;
    const preview = document.getElementById("avatar-preview") as HTMLImageElement;
    preview.src = URL.createObjectURL(file);
}

async function handleSaveProfile() {
    const msgEl = document.getElementById("status-msg") as HTMLElement;
    msgEl.innerText = "Salvando...";

    const bio = (document.getElementById("bio-input") as HTMLTextAreaElement).value;

    await api("/auth/me/", {
        method: "PATCH",
        body: JSON.stringify({ bio }),
    });

    if (selectedAvatarFile) {
        const formData = new FormData();
        formData.append("avatar", selectedAvatarFile);

        await api("/auth/me/", {
            method: "PATCH",
            body: formData,
        });
    }

    msgEl.innerText = "Perfil atualizado com sucesso!";

    setTimeout(loadProfile, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("avatar-input")?.addEventListener("change", handleAvatarChange);
    document.getElementById("save-btn")?.addEventListener("click", handleSaveProfile);
    loadProfile();
});
