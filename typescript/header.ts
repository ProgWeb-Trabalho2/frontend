onload = () => {
  var header = document.createElement("div");
  header.id = "header";

  document.body.prepend(header);

  header.appendChild(tagHome());

  if (localStorage.getItem("token") == null) {
    header.appendChild(tagLogin());
    header.appendChild(tagCadastro());
  } else {
    var username = document.createElement("div");
    username.textContent = localStorage.getItem("username");
    header.appendChild(username);

    const btnLogout = tagLogout();
    header.appendChild(btnLogout);

    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.reload();
    });
  }
};

function tagHome() {
  var tag = document.createElement("a");
  tag.setAttribute("href", "/");
  tag.textContent = "Home";
  return tag;
}

function tagCadastro() {
  var tag = document.createElement("a");
  tag.setAttribute("href", "/auth/cadastro.html");
  tag.textContent = "Cadastro";
  return tag;
}

function tagLogin() {
  var tag = document.createElement("a");
  tag.setAttribute("href", "/auth/login.html");
  tag.textContent = "Login";
  return tag;
}

function tagLogout() {
  var tag = document.createElement("button");
  tag.setAttribute("id", "btnLogout");
  tag.textContent = "Logout";
  return tag;
}
