export class Game {
    constructor(raw) {
        var _a;
        this.id = raw.id;
        this.name = raw.name;
        this.summary = raw.summary;
        this.genres = Array.isArray(raw.genres)
            ? raw.genres.map((g) => g.name)
            : [];
        this.coverUrl = (_a = raw.cover) === null || _a === void 0 ? void 0 : _a.url;
        if (raw.release_dates && raw.release_dates.length > 0) {
            const unix = raw.release_dates[0].date;
            this.releaseDate = new Date(unix * 1000).toLocaleDateString("pt-BR");
        }
        else {
            this.releaseDate = null;
        }
    }
}
//# sourceMappingURL=Game.js.map