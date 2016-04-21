import { loadIntlMessages } from "../../src/actions/IntlActionCreators";
import { LOAD_INTL_SERVER } from "../../src/constants/Actions";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

describe("Load Intl Messages Creators", () => {
  it("should create an action to load international messages", () => {
    const dataMock = {};
    let doneSpy = sinon.spy();
    let dispatchSpy = sinon.spy();
    let result = loadIntlMessages({
      dispatch: dispatchSpy
    }, { locale: "en" }, doneSpy);

    sinon.assert.calledOnce(doneSpy);
    sinon.assert.calledWith(dispatchSpy, LOAD_INTL_SERVER);
  });
});
