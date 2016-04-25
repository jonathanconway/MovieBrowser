import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import Movie from "../../src/components/Movie";
chai.use(sinonChai);

describe("Movie Component", () => {
  it("should render a Movie, with the current genre highlighted", () => {
    const onChangeSpy = sinon.spy();
    const currentGenre = "genre1";
    const movie = { title: "movie", genres: ["genre1", "genre2"] };
    const renderer = TestUtils.createRenderer();
    renderer.render(<Movie currentGenre={ currentGenre } movie={ movie } />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('tr');
    expect(output.props.children[1].props.children[0].props.children[0].props.className).to.equal("Movie-td-genre-current");
    expect(output.props.children[1].props.children[0].props.children[0].props.children).to.equal("genre1");
    expect(output.props.children[1].props.children[1].props.children[0].props.className).to.equal(false);
    expect(output.props.children[1].props.children[1].props.children[0].props.children).to.equal("genre2");
  });
});