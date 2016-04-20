import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

export default class MoviesStore extends BaseStore {

  static storeName = "MoviesStore"

  static handlers = {
    [Actions.LOAD_MOVIES_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
  }

  handleLoadSuccess({ genre, movies }) {
    this.genre = genre;
    this.movies = movies;
    this.emitChange();
  }

  getMovies() {
    return this.movies;
  }

  getMoviesByGenre() {
    if (this.genre) {
      return this.movies.filter((movie) => {
        return movie.genres.indexOf(this.genre) > -1;
      });
    }
    return this.movies;
  }

  getCurrentGenre() {
    return this.genre;
  }

  getGenres() {
    if (this.movies && this.movies.length) {
      return this.movies
        .map((movie) => {
          return movie.genres;
        })
        .reduce((genres1, genres2) => {
          return genres1.concat(
              genres2.filter((genres2item) => {
                return genres1.indexOf(genres2item) === -1;
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
