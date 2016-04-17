import React, { PropTypes, Component } from "react";
import Movie  from "../components/Movie";

export default class Movies extends Component {

  static propTypes = {
    movies: PropTypes.object.isRequired,
  }

  render() {
    const { movies } = this.props;
    return (
      <table className="MoviesCollection">
        <tbody>
            {
              movies.map(movie =>
                <Movie movie={ movie } />
              )
            }
        </tbody>
      </table>
    );
  }

}
