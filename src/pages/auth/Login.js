import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { validateEmail } from "../../components/helpers/EmailValidator";
import { connect } from "react-redux";
import { compose } from "redux";
import * as ACTIONS from "../../store/actions/userActions";

function Login(props) {
  const [user, setuser] = useState({ password: "", email: "" });
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const changeHandler = (e) =>
    setuser({ ...user, [e.currentTarget.name]: e.currentTarget.value });

  const inputChecker = () => {
    let isPasswordValid = true;
    let isEmailValid = true;

    if (user.password === "" || user.password.length < 6) {
      setpasswordError("is-invalid");
      isPasswordValid = false;
    } else {
      setpasswordError("is-valid");
      isPasswordValid = true;
    }

    if (validateEmail(user.email)) {
      setemailError("is-valid");
      isEmailValid = true;
    } else {
      setemailError("is-invalid");
      isEmailValid = false;
    }

    if (isPasswordValid && isEmailValid) {
      return true;
    } else return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputChecker()) {
      props.onLogin({ ...user });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card card-body bg-light mt-5">
          <h2>Login</h2>
          <p>Please fill in your credentials to log in</p>
          <h5 className="text-center text-danger">{props.error}</h5>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">
                Email: <sup>*</sup>
              </label>
              <input
                type="email"
                name="email"
                className={`form-control form-control ${emailError}`}
                onChange={changeHandler}
              />
              {emailError === "is-invalid" && (
                <span className="invalid-feedback">Invalid Email</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password: <sup>*</sup>
              </label>
              <input
                type="password"
                name="password"
                className={`form-control form-control ${passwordError}`}
                onChange={changeHandler}
              />
              {passwordError === "is-invalid" && (
                <span className="invalid-feedback">Invalid Password</span>
              )}
            </div>
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-success btn-block"
                  onClick={submitHandler}
                >
                  Login
                </button>
              </div>
              <div className="col">
                <Link to="/signup" className="btn btn-light btn-block">
                  No account? Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.user.loginError,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (user) => dispatch(ACTIONS.login(user, ownProps)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Login);

// export default withRouter(Login);
