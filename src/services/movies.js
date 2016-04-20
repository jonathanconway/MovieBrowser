let fs = require("fs");

export default {
  name: "movies",

  read(req, resource, { genre }, config, done) {
    const query = {
      genre: genre
    };
    const options = {
      locale: req.locale
    };

    let movies = JSON.parse(fs.readFileSync('static/json/movies.json', 'utf8'));

    done(null, movies);
  }
};
