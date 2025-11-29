const logoutButton = document.getElementById("logout-link");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("editReviewId");
        window.location.href = "login.html";
    });
}

document.getElementById("logout-link")?.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("editReviewId");
    window.location.href = "login.html";
});