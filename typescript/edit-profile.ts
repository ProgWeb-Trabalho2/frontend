import { backendAddress } from "./constantes.js";

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

async function saveProfile() {
  const token = localStorage.getItem("accessToken");

  const bio = (document.getElementById("bio-input") as HTMLTextAreaElement)
    .value;
  const avatar = (document.getElementById("avatar-input") as HTMLInputElement)
    .files?.[0];

  const formData = new FormData();
  formData.append("bio", bio);
  if (avatar) formData.append("avatar", avatar);

  const response = await fetch(backendAddress + "api/auth/me/", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  document.getElementById("status-msg")!.textContent = "Perfil atualizado";
  return data;
}

onload = () => {
  document.getElementById("save-edit")!.addEventListener("click", saveProfile);

  const input = document.getElementById("avatar-input") as HTMLInputElement;
  const preview = document.getElementById("avatar-preview") as HTMLImageElement;

  input.addEventListener("change", () => {
    if (input.files?.[0]) {
      preview.src = URL.createObjectURL(input.files[0]);
    }
  });
};
