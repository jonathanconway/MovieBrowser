import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

export default class MoviesStore extends BaseStore {

  static storeName = "MoviesStore"

  constructor(dispatcher) {
    super(dispatcher);
    this.movies = [
      {"rating": 8.8, "genres": ["Action", "Adventure", "Fantasy", "Sci-Fi"], "rated": "PG", "language": ["English"], "title": "Star Wars"},
      {"rating": 8.1, "genres": ["Animation", "Adventure", "Comedy", "Family"], "rated": "G", "language": ["English"], "title": "Finding Nemo"}
    ];
  }

  getMovies() {
    return this.movies;
  }

  getGenres() {
    if (this.movies.length) {
      return this.movies.reduce(function (a, b) {
        return a.genres.concat(
          b.genres.filter(function (bb) {
            return a.genres.indexOf(bb) === -1;
          }));
      });
    }
  }

  dehydrate() {
    return {
      movies: this.movies,
      genres: this.genres
    };
  }

  rehydrate(state) {
    this.movies = state.movies;
    this.genres = state.genres;
  }

}
