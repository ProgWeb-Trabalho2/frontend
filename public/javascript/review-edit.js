var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { api } from "./api.js";
function loadReview() {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        const index = Number(localStorage.getItem("editReviewId"));
        const list = JSON.parse(localStorage.getItem("reviews") || "[]");
        const review = list[index];
        console.log(list);
    });
}
onload = () => {
    loadEditForm();
};
export {};
=======
        const reviewId = localStorage.getItem("editReviewId");
        if (!reviewId)
            return window.location.href = "profile.html";
        const review = yield api(`/reviews/${reviewId}/`);
        document.getElementById("score").value = review.score;
        document.getElementById("comment").value = review.comment;
        const gameRes = yield fetch(`http://localhost:8000/api/games/search-by-id/${review.game_id}/`);
        const data = yield gameRes.json();
        const game = data[0];
        document.getElementById("game-name").innerText = game.name;
    });
}
function saveReview() {
    return __awaiter(this, void 0, void 0, function* () {
        const reviewId = localStorage.getItem("editReviewId");
        if (!reviewId)
            return;
        const score = Number(document.getElementById("score").value);
        const comment = document.getElementById("comment").value;
        yield api(`/reviews/${reviewId}/`, {
            method: "PATCH",
            body: JSON.stringify({ score, comment })
        });
        document.getElementById("msg").innerText = "Alterações salvas com sucesso!";
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    });
}
document.getElementById("save-edit")
    .addEventListener("click", saveReview);
loadReview();
>>>>>>> feature/jogos
//# sourceMappingURL=review-edit.js.map