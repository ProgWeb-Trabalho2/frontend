import { backendAddress } from "./constantes.js";
document.getElementById("btnCadastro").addEventListener("click", (evento) => {
    evento.preventDefault();
    console.log("apertou o botao");
    const username = document.getElementById("username")
        .value;
    const password = document.getElementById("password")
        .value;
    const password_confirm = document.getElementById("password-confirm").value;
    fetch(backendAddress + "accounts/register/", {
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
        console.log(token);
        localStorage.setItem("token", token);
        window.location.replace("index.html");
    })
        .catch((erro) => {
        console.log(erro);
    });
});
//# sourceMappingURL=cadastro.js.map