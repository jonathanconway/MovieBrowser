import React, { PropTypes, Component } from "react";

if (process.env.BROWSER) {
  require("../style/Movie.scss");
}

export default class Movie extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
  }

  render() {
    const { movie } = this.props;
    return (
      <tr className="Movie">
        <td>{ movie.title }</td>
        <td>{ movie.genres.join(', ') }</td>
      </tr>
    );
  }

}
