import React, { PropTypes, Component } from "react";

export default class Movie extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
  }

  render() {
    const { movie } = this.props;
    return (
      <tr>
        <td>{ movie.title }</td>
        <td>{ movie.genres.join(', ') }</td>
      </tr>
    );
  }

}
