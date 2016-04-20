import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import GenreField  from "../components/GenreField";
import Movies  from "../components/Movies";
import { loadMovies } from "../actions/MoviesActionCreators";

@connectToStores(["MoviesStore"], context => {
  const movies = context.getStore("MoviesStore").getMoviesByGenre();
  const genres = context.getStore("MoviesStore").getGenres();
  return {
    movies: movies || [],
    genres: genres || []
  };
})
export default class HomePage extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  handleGenreSelectChange(e) {
    this.context.executeAction(loadMovies, { genre: e.target.value });
  }

  render() {
    const { movies, genres } = this.props;

    return (
      <div>
        <GenreField genres={ genres } onChange={ this.handleGenreSelectChange.bind(this) } />
        <br /> <br />
        <Movies movies={ movies } />
      </div>
    );
  }

}
