document.getElementById("btnLogout").addEventListener("click", (evento) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
});
export {};
//# sourceMappingURL=logout.js.map