async function loadEditForm() {
  const index = Number(localStorage.getItem("editReviewId"));
  const list = JSON.parse(localStorage.getItem("reviews") || "[]");
  const review = list[index];

  console.log(list);
}

onload = () => {
  loadEditForm();
};
