import { backendAddress } from "./constantes";

function exibeListaGames() {
    fetch(backendAddress + "games/lista")
    .then(response => response.json())
    .then
}