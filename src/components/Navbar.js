import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import * as ACTIONS from "../store/actions/userActions";

export function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Reactive Nest
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            {props.isAuthenticated && (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            {props.isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={props.onLogout}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(ACTIONS.logout()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Navbar);
