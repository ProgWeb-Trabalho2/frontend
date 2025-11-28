import { backendAddress } from "./constantes.js";

(document.getElementById("btnCadastro") as HTMLButtonElement).addEventListener(
  "click",
  (evento) => {
    evento.preventDefault();
    console.log("apertou o botao");
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const password_confirm = (
      document.getElementById("password-confirm") as HTMLInputElement
    ).value;

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
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data: { token: string }) => {
        const token = data.token;
        console.log(token);
        localStorage.setItem("token", token);
        window.location.replace("index.html");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
);
