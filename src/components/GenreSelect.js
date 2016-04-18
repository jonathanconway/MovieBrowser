import React, { PropTypes, Component } from "react";

export default class GenreSelect extends Component {

  static propTypes = {
    genres: PropTypes.array.isRequired
  }

  handleGenreChange(e) {
    window.location.hash = encodeURIComponent(e.target.value);
  }

  render() {
    const { genres } = this.props;
    return (
      <select
        className="GenreSelect"
        onChange={ this.handleGenreChange }>
        {
          genres.map(genre =>
            <option value={ genre } key={ genre }>{ genre }</option>
          )
        }
      </select>
    );
  }

}
