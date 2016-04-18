import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

export default {

  loadMovies(context, { genre }, done) {

    context.service.read("movies", { genre }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_MOVIES_SUCCESS, {
          genre: genre,
          movies: data
        });

        done();
      }

    );
  }

};
