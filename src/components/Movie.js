import React, { PropTypes, Component } from "react";

export default class Movie extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
  }

  render() {
    const { movie } = this.props;
    return (
      <tr className="Movie">
        <td className="Movies-td">{ movie.title }</td>
        <td className="Movies-td">{ movie.genres.join(', ') }</td>
      </tr>
    );
  }

}
