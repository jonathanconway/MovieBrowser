import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import Movies from "../../src/components/Movies";
chai.use(sinonChai);

describe("Movies Component", () => {
  it("should render movies", () => {
    const onChangeSpy = sinon.spy();
    const currentGenre = "genre1";
    const movies = [{ title: "movie1" }, { title: "movie2" }];
    const renderer = TestUtils.createRenderer();
    renderer.render(<Movies movies={ movies } currentGenre={ currentGenre } />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('table');
    expect(output.props.children.props.children[0].props.movie).to.equal(movies[0]);
    expect(output.props.children.props.children[0].props.currentGenre).to.equal(currentGenre);
    expect(output.props.children.props.children[1].props.movie).to.equal(movies[1]);
    expect(output.props.children.props.children[1].props.currentGenre).to.equal(currentGenre);
  });
});