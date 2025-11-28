import { backendAddress } from "./constantes.js";
import { Game } from "./Game.js";

const params = new URLSearchParams(window.location.search);
const gameID = params.get("id");

onload = async () => {
  console.log("carregou");
  if (!gameID) return;

  const game = await fetchGame(gameID);
  if (!game) return;

  console.log(game);
  document.getElementById("title")!.textContent = game.name;
  document.getElementById("name")!.textContent = game.name;

  const image = document.getElementById("cover") as HTMLImageElement;
  image.src = game.coverUrl ?? "";

  document.getElementById("releaseDate")!.textContent = game.releaseDate;

  document.getElementById("summary")!.textContent = game.summary;
};

async function fetchGame(id: string) {
  const response = await fetch(backendAddress + "games/search-by-id/" + id);

  if (!response.ok) return;

  const data = await response.json();
  return new Game(data[0]);
}
