import React, { Component, PropTypes } from "react";

if (process.env.BROWSER) {
  require("../style/Page.scss");
}

export default class Page extends Component {

  render() {
    return (
      <div className="Page">

        <div className="Page-header">
          <h1 className="Page-header-title">MovieBrowser</h1>
        </div>

        <div className="Page-body">
          { this.props.children }
        </div>

      </div>
    );
  }

}
