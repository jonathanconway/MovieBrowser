import React, { PropTypes, Component } from "react";
import GenreSelect  from "../components/GenreSelect";
import { FormattedMessage }  from "../utils/IntlComponents";

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
        <label className="GenreField-label" htmlFor="genre-select">
          <FormattedMessage message="home.genreTitle" />
        </label>
        <GenreSelect id="genre-select" onChange={ this.props.onChange } genres={ this.props.genres } />
      </div>
    );
  }

}
