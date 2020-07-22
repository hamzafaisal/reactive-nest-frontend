const { ACTIONS } = require("../actions/userActions");

const initialState = {
  currentUser: null,
  signupError: null,
  loginError: null,
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP:
      //   console.log(action.user);
      return {
        ...state,
        // currentUser: action.user,
        signupError: null,
      };

    case ACTIONS.SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.error,
      };

    case ACTIONS.LOGIN:
      return {
        ...state,
        currentUser: action.user,
        loginError: null,
        isAuthenticated: true,
      };

    case ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
