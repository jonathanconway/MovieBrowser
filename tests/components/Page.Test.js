import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import React from "react";
import TestUtils from "react-addons-test-utils";
import Page from "../../src/components/Page";
chai.use(sinonChai);

describe("Page Component", () => {
  it("should render header and children within body", () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Page><h1>Hello</h1></Page>);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal('div');
    expect(output.props.children[0].props.className).to.equal('Page-header');
    expect(output.props.children[0].props.children[0].props.className).to.equal('Page-header-title');
    expect(output.props.children[1].props.children.type).to.equal('h1');
    expect(output.props.children[1].props.children.props.children).to.equal('Hello');
  });
});