// Actions to run when the router matches a route. Used in app/routes.js

import { loadFeaturedPhotos, loadPhoto } from "../actions/PhotoActionCreators";
import { loadMovies } from "../actions/MoviesActionCreators";

export default {

  featuredPage(context, route, done) {
    const feature = route.getIn(["params", "feature"]);
    context.executeAction(loadFeaturedPhotos, { feature }, done);
  },

  photoPage(context, route, done) {
    const id = route.getIn(["params", "id"]);
    context.executeAction(loadPhoto, { id }, done);
  },

  homePage(context, route, done) {
    const genre = route.getIn(["params", "genre"]);
    context.executeAction(loadMovies, { genre }, done);
  },

  // do not load something, just send an error in the callback
  // to show how the app react with errors
  badPage(context, route, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};
