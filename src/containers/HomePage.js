import React, { Component } from "react";
import GenreSelect  from "../components/GenreSelect";
import Movies  from "../components/Movies";

export default class HomePage extends Component {

  render() {
    const movies = [
      {"rating": 8.8, "genres": ["Action", "Adventure", "Fantasy", "Sci-Fi"], "rated": "PG", "language": ["English"], "title": "Star Wars"},
      {"rating": 8.1, "genres": ["Animation", "Adventure", "Comedy", "Family"], "rated": "G", "language": ["English"], "title": "Finding Nemo"}
    ];

    return (
      <div>
        <GenreSelect />
        <br /> <br />
        <Movies movies={ movies } />
      </div>
    );
  }

}
