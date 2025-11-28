import { api, setAccessToken } from "./api.js";

document.getElementById("login-form")!.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const result = await api("/auth/login/", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });

    if (result.access) {
        setAccessToken(result.access);
        window.location.href = "profile.html";
    } else {
        alert(result.error || "Erro no login");
    }

    return false;
});
