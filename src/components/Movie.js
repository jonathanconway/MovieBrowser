import React, { PropTypes, Component } from "react";

export default class Movie extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
  }

  render() {
    const { movie } = this.props;
    return (
      <tr className="Movie-tr">
        <td className="Movie-td">{ movie.title }</td>
        <td className="Movie-td">{ movie.genres.join(', ') }</td>
      </tr>
    );
  }

}
