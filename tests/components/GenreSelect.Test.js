import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import GenreSelect from "../../src/components/GenreSelect";
chai.use(sinonChai);

describe("Genre Select Component", () => {
  it("should render a GenreSelect", () => {
    const onChangeSpy = sinon.spy();
    const genresDummy = ["genre1", "genre2"];
    const renderer = TestUtils.createRenderer();
    renderer.render(<GenreSelect genres={ genresDummy } onChange={ onChangeSpy } />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('select');
    expect(output.props.children[1][0].props.value).to.equal("genre1");
    expect(output.props.children[1][1].props.value).to.equal("genre2");
  });
});