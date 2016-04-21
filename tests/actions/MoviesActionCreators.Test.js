import { loadMovies } from "../../src/actions/MoviesActionCreators";
import { LOAD_MOVIES_SUCCESS } from "../../src/constants/Actions";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

describe("Movie Action Creators", () => {
  it("should create an action to load the movies", () => {
    const dataMock = {};
    let doneSpy = sinon.spy();
    let dispatchSpy = sinon.spy();
    let result = loadMovies({
      service: {
        read: (a,b,c,d) => {
          d(null, dataMock);
        }
      },
      dispatch: dispatchSpy
    }, "genre", doneSpy);

    sinon.assert.calledOnce(doneSpy);
    sinon.assert.calledWith(dispatchSpy, LOAD_MOVIES_SUCCESS);
  });
});
