
import InitActions from "./containers/InitActions";

import HomePage from "./containers/HomePage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action: InitActions.homePage
  },

  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: "/bad",
    method: "get",
    action: InitActions.badPage
  }

};
