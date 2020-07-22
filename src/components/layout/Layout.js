import React, { Fragment } from "react";
import Navbar from "../Navbar";

function Layout(props) {
  return (
    <Fragment>
      <Navbar />
      <div className="container">{props.children}</div>
    </Fragment>
  );
}

export default Layout;
