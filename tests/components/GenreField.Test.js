import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import GenreField from "../../src/components/GenreField";
chai.use(sinonChai);

describe("Genre Field Component", () => {
  it("should render a GenreSelect", () => {
    const onChangeSpy = sinon.spy();
    const genresDummy = ["genre1", "genre2"];
    const renderer = TestUtils.createRenderer();
    renderer.render(<GenreField genres={ genresDummy } onChange={ onChangeSpy } />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('div');
    expect(output.props.children[1].props.id).to.equal('genre-select');
    expect(output.props.children[1].props.onChange).to.equal(onChangeSpy);
    expect(output.props.children[1].props.genres).to.equal(genresDummy);
  });

  it("should trigger a change event when changed", () => {
    const onChangeSpy = sinon.spy();
    const genresDummy = ["genre1", "genre2"];
    const renderer = TestUtils.createRenderer();
    renderer.render(<GenreField genres={ genresDummy } onChange={ onChangeSpy } />);
    const output = renderer.getRenderOutput();

    output.props.children[1].props.onChange();

    expect(onChangeSpy.called).to.be.true;
  });
});