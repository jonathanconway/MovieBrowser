import React, { PropTypes, Component } from "react";
import GenreSelect  from "../components/GenreSelect";

if (process.env.BROWSER) {
  require("../style/GenreField.scss");
}

export default class GenreField extends Component {

  static propTypes = {
    genres: PropTypes.array.isRequired,
    onChange: PropTypes.func
  }

  render() {
    const { genres, onChange } = this.props;
    return (
      <div className="GenreField">
        <label className="GenreField-label" for="genre-select">Genre:</label>
        <GenreSelect id="genre-select" onChange={ this.props.onChange } genres={ this.props.genres } />
      </div>
    );
  }

}
