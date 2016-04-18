// import { get } from "../utils/APIUtils";

// Fetchr service to load photos for the given feature.

export default {
  name: "movies",

  read(req, resource, { genre }, config, done) {
    const query = {
      genre: genre
    };
    const options = {
      locale: req.locale
    };
    done(null, [
      {"rating": 8.8, "genres": ["Action", "Adventure", "Fantasy", "Sci-Fi"], "rated": "PG", "language": ["English"], "title": "Star Wars"},
      {"rating": 8.1, "genres": ["Animation", "Adventure", "Comedy", "Family"], "rated": "G", "language": ["English"], "title": "Finding Nemo"}
    ]);
    // get("/movies", query, options, done);
  }

};
