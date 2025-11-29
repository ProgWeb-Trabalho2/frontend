import { clearToken } from "./api.js";

document.getElementById("logout-btn")!.addEventListener("click", () => {
    clearToken();
    window.location.href = "login.html";
});
