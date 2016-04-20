import React, { PropTypes, Component } from "react";

export default class Movie extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
    currentGenre: PropTypes.string
  }

  render() {
    const { movie, currentGenre } = this.props;
    return (
      <tr className="Movie-tr">
        <td className="Movie-td">{ movie.title }</td>
        <td className="Movie-td">
          {
            movie.genres.map((genre, index) =>
              <span><span className={ genre === currentGenre && 'Movie-td-genre-current' }>{ genre }</span>{ ((index < (movie.genres.length - 1)) && ', ') }</span>
            )
          }
        </td>
      </tr>
    );
  }

}
