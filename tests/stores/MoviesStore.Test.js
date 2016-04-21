import MoviesStore from "../../src/stores/MoviesStore";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

var expect = chai.expect;

describe("Movies Store", () => {
  it("should expose movies", () => {
    let store = new MoviesStore({ });

    const movies = [1, 2, 3];
    const genres = [4, 5, 6]

    store.rehydrate({ movies: movies, genres: genres });

    expect(store.getMovies()).to.equal(movies);
  });

  it("should expose a unique list of the genres of all movies", () => {
    let store = new MoviesStore({ });

    const movies = [{ title: '1', genres: [1, 2] }, { title: '2', genres: [1, 3, 4] }];

    store.handleLoadSuccess({ movies: movies });

    let genres = store.getGenres();

    for (let i = 0; i < 4; i++)
      expect(genres[i]).to.equal(i + 1);
  });

  it("should expose current genre", () => {
    let store = new MoviesStore({ });

    const genre = 'genre';

    store.handleLoadSuccess({ movies: [1, 2], genre: genre });

    expect(store.getCurrentGenre()).to.equal(genre);
  });

  it("should expose movies filtered by genre", () => {
    let store = new MoviesStore({ });

    const movies = [{ title: '1', genres: [1, 2] }, { title: '2', genres: [3, 4] }];
    const genres = [1, 2, 3, 4]

    store.handleLoadSuccess({ movies: movies, genre: 1 });

    expect(store.getMoviesByGenre()[0]).to.equal(movies[0]);
  });
});
