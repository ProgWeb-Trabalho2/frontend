import { backendAddress } from "./constantes.js";
document.getElementById("btnLogin").addEventListener("click", (evento) => {
    evento.preventDefault();
    const username = document.getElementById("username")
        .value;
    const password = document.getElementById("password")
        .value;
    fetch(backendAddress + "accounts/login/", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
        .then((data) => {
        const token = data.token;
        const username = data.username;
        console.log(data);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        // window.location.href = "/";
    })
        .catch((erro) => {
        console.log(erro);
    });
});
//# sourceMappingURL=login.js.map