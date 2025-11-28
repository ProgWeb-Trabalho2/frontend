export class Game {
  id: number;
  name: string;
  summary: string;
  genres: string[];
  coverUrl: string | null;
  releaseYear: string | null;

  constructor(raw: any) {
    this.id = raw.id;
    this.name = raw.name;
    this.summary = raw.summary;
    this.genres = Array.isArray(raw.genres)
      ? raw.genres.map((g: any) => g.name)
      : [];
    this.coverUrl = raw.cover?.url;

    if (raw.release_dates && raw.release_dates.length > 0) {
      const unix = raw.release_dates[0].date;
      this.releaseYear = new Date(unix * 1000).toLocaleDateString("pt-BR");
    } else {
      this.releaseYear = null;
    }

    raw.name;
  }
}
