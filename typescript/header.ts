onload = () => {
    var header = document.createElement("div");
    header.id = "header";

    document.body.prepend(header);

    header.appendChild(tagHome());
    header.appendChild(tagCadastro());
}

function tagHome() {
    var home = document.createElement("a");
    home.setAttribute("href", "/");
    home.setAttribute("target", "_top")
    home.textContent = "Home";
    return home;
}

function tagCadastro() {
    var cadastro = document.createElement("a");
    cadastro.setAttribute("href", "/auth/cadastro.html");
    cadastro.setAttribute("target", "_top")
    cadastro.textContent = "Cadastro";
    return cadastro;
}