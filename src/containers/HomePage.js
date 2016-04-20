import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import GenreField  from "../components/GenreField";
import Movies  from "../components/Movies";
import { loadMovies } from "../actions/MoviesActionCreators";

@connectToStores(["MoviesStore"], context => {
  const movies = context.getStore("MoviesStore").getMoviesByGenre();
  const currentGenre = context.getStore("MoviesStore").getCurrentGenre();
  const genres = context.getStore("MoviesStore").getGenres();
  return {
    movies: movies || [],
    genres: genres || [],
    currentGenre: currentGenre || ''
  };
})
export default class HomePage extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired,
    currentGenre: PropTypes.string
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  handleGenreSelectChange(e) {
    this.context.executeAction(loadMovies, { genre: e.target.value });
  }

  render() {
    const { movies, genres, currentGenre } = this.props;

    return (
      <div>
        <GenreField genres={ genres } onChange={ this.handleGenreSelectChange.bind(this) } />
        <br /> <br />
        <Movies movies={ movies } currentGenre={ currentGenre } />
      </div>
    );
  }

}
