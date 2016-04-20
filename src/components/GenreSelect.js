import React, { PropTypes, Component } from "react";

export default class GenreSelect extends Component {

  static propTypes = {
    genres: PropTypes.array.isRequired,
    onChange: PropTypes.func
  }

  render() {
    const { genres, onChange } = this.props;
    return (
      <select
        className="GenreSelect"
        onChange={ this.props.onChange }>
        <option value=""></option>
        {
          genres.map(genre =>
            <option value={ genre } key={ genre }>{ genre }</option>
          )
        }
      </select>
    );
  }

}
