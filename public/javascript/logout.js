var _a;
const logoutButton = document.getElementById("logout-link");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("editReviewId");
        window.location.href = "login.html";
    });
}
(_a = document.getElementById("logout-link")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("editReviewId");
    window.location.href = "login.html";
});
export {};
//# sourceMappingURL=logout.js.map