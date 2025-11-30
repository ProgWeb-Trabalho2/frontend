import { api, setAccessToken } from "./api.js";

document
  .getElementById("register-form")!
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const result = await api("auth/register/", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    if (result.access) {
      setAccessToken(result.access);
      window.location.href = "profile.html";
    } else {
      alert(result.error || "Erro ao cadastrar");
    }

    return false;
  });
