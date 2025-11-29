var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadEditForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const index = Number(localStorage.getItem("editReviewId"));
        const list = JSON.parse(localStorage.getItem("reviews") || "[]");
        const review = list[index];
        const res = yield fetch("./data/games.json");
        const games = yield res.json();
        const select = document.getElementById("game-select");
        games.forEach((g) => {
            const opt = document.createElement("option");
            opt.value = g.id.toString();
            opt.textContent = g.name;
            if (opt.value === review.game)
                opt.selected = true;
            select.appendChild(opt);
        });
        document.getElementById("score").value = review.score;
        document.getElementById("comment").value =
            review.comment;
        document.getElementById("update-btn").addEventListener("click", () => {
            review.game = select.value;
            review.score = document.getElementById("score").value;
            review.comment = document.getElementById("comment").value;
            list[index] = review;
            localStorage.setItem("reviews", JSON.stringify(list));
            localStorage.removeItem("editReviewId");
            window.location.href = "profile.html";
        });
    });
}
loadEditForm();
export {};
//# sourceMappingURL=review-edit.js.map