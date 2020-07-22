import Axios from "axios";

export const ACTIONS = {
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  SIGNUP_ERROR: "SIGNUP_ERROR",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT: "LOGOUT",
};

const signupError = (error) => {
  return {
    type: ACTIONS.SIGNUP_ERROR,
    error,
  };
};

const signupToStore = (user) => {
  return {
    type: ACTIONS.SIGNUP,
    user,
  };
};

export const signup = (user, ownProps) => {
  return (dispatch) => {
    Axios.post(`${process.env.NEST_APP_BACKEND_URL}/auth/signup`, {
      ...user,
    })
      .then((response) => {
        dispatch(signupToStore({ ...response.data }));
        ownProps.history.push("/login");
      })
      .catch((error) => {
        dispatch(signupError(error.message));
      });
  };
};

const loginError = (error) => {
  return {
    type: ACTIONS.LOGIN_ERROR,
    error,
  };
};

const loginToStore = (user) => {
  return {
    type: ACTIONS.LOGIN,
    user,
  };
};

export const login = (user, ownProps) => {
  return (dispatch) => {
    Axios.post(`${process.env.NEST_APP_BACKEND_URL}/auth/login`, {
      ...user,
    })
      .then((response) => {
        dispatch(loginToStore({ ...response.data }));
        ownProps.history.push("/");
      })
      .catch((error) => {
        dispatch(loginError(error.message));
      });
  };
};

export const logout = () => {
  return {
    type: ACTIONS.LOGOUT,
  };
};
