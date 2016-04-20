import React, { PropTypes, Component } from "react";
import Movie  from "../components/Movie";

if (process.env.BROWSER) {
  require("../style/Movies.scss");
}

export default class Movies extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired,
    currentGenre: PropTypes.string
  }

  render() {
    const { movies, currentGenre } = this.props;
    return (
      <table className="MoviesCollection">
        <tbody>
            {
              movies.map(movie =>
                <Movie movie={ movie } key={ movie.title } currentGenre={ currentGenre } />
              )
            }
        </tbody>
      </table>
    );
  }

}
