import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { validateEmail } from "../../components/helpers/EmailValidator";
import { compose } from "redux";
import { connect } from "react-redux";
import * as ACTIONS from "../../store/actions/userActions";

function Signup(props) {
  const [user, setuser] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  const changeHandler = (e) =>
    setuser({ ...user, [e.currentTarget.name]: e.currentTarget.value });

  const inputChecker = () => {
    let isPasswordValid = true;
    let isEmailValid = true;
    let isNameValid = true;
    let isConfirmPasswordValid = true;

    if (user.name === "") {
      setnameError("is-invalid");
      isNameValid = false;
    } else {
      setnameError("is-valid");
      isNameValid = true;
    }

    if (user.password.length < 6) {
      setpasswordError("is-invalid");
      isPasswordValid = false;
    } else {
      setpasswordError("is-valid");
      isPasswordValid = true;
    }

    if (
      user.confirmPassword !== user.password ||
      user.confirmPassword.length < 6
    ) {
      setconfirmPasswordError("is-invalid");
      isConfirmPasswordValid = false;
    } else {
      setconfirmPasswordError("is-valid");
      isConfirmPasswordValid = true;
    }

    if (validateEmail(user.email)) {
      setemailError("is-valid");
      isEmailValid = true;
    } else {
      setemailError("is-invalid");
      isEmailValid = false;
    }

    if (
      isPasswordValid &&
      isEmailValid &&
      isNameValid &&
      isConfirmPasswordValid
    ) {
      return true;
    } else return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputChecker()) {
      props.onSignup({ ...user });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card card-body bg-light mt-3">
            <h2>Create An Account</h2>
            <p>Please fill out this form to register with us</p>
            <h5 className="text-center text-danger">{props.error}</h5>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="name">
                  Name: <sup>*</sup>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control form-control ${nameError}`}
                  onChange={changeHandler}
                />
                {nameError === "is-invalid" && (
                  <span className="invalid-feedback">Name Required</span>
                )}
              </div>
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
                  <span className="invalid-feedback">
                    Password must be 6 characters long
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">
                  Confirm Password: <sup>*</sup>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control form-control ${confirmPasswordError}`}
                  onChange={changeHandler}
                />
                {confirmPasswordError === "is-invalid" && (
                  <span className="invalid-feedback">
                    Confirm password not match
                  </span>
                )}
              </div>
              <div className="row">
                <div className="col">
                  <button
                    onClick={submitHandler}
                    className="btn btn-success btn-block"
                  >
                    Register
                  </button>
                </div>
                <div className="col">
                  <Link to="/login" className="btn btn-light btn-block">
                    Have an account? Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.user.signupError,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSignup: (user) => dispatch(ACTIONS.signup(user, ownProps)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Signup);
