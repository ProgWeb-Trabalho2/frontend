async function loadEditForm() {
  const index = Number(localStorage.getItem("editReviewId"));
  const list = JSON.parse(localStorage.getItem("reviews") || "[]");
  const review = list[index];

  const res = await fetch("./data/games.json");
  const games = await res.json();

  const select = document.getElementById("game-select") as HTMLSelectElement;
  games.forEach((g: any) => {
    const opt = document.createElement("option");
    opt.value = g.id.toString();
    opt.textContent = g.name;
    if (opt.value === review.game) opt.selected = true;
    select.appendChild(opt);
  });

  (document.getElementById("score") as HTMLInputElement).value = review.score;
  (document.getElementById("comment") as HTMLTextAreaElement).value =
    review.comment;

  document.getElementById("update-btn")!.addEventListener("click", () => {
    review.game = select.value;
    review.score = (document.getElementById("score") as HTMLInputElement).value;
    review.comment = (
      document.getElementById("comment") as HTMLTextAreaElement
    ).value;

    list[index] = review;
    localStorage.setItem("reviews", JSON.stringify(list));

    localStorage.removeItem("editReviewId");
    window.location.href = "profile.html";
  });
}

loadEditForm();
