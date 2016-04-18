import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import GenreSelect  from "../components/GenreSelect";
import Movies  from "../components/Movies";

@connectToStores(["MoviesStore"], context => {
  const movies = context.getStore("MoviesStore").getMovies();
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

  render() {
    const { movies, genres } = this.props;

    return (
      <div>
        <GenreSelect genres={ genres } />
        <br /> <br />
        <Movies movies={ movies } />
      </div>
    );
  }

}
