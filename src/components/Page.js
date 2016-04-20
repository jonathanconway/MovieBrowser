import React, { Component, PropTypes } from "react";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { FormattedMessage }  from "../utils/IntlComponents";

if (process.env.BROWSER) {
  require("../style/Page.scss");
}

export default class Page extends Component {

  render() {
    return (
      <div className="Page">

        <div className="Page-header">
          <h1 className="Page-header-title">
            <FormattedMessage message="meta.title" />
          </h1>
          <LocaleSwitcher />
        </div>

        <div className="Page-body">
          { this.props.children }
        </div>

      </div>
    );
  }

}
