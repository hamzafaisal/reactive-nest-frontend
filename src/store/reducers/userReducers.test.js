import { userReducer } from "./userReducers";
import { ACTIONS } from "../actions/userActions";

describe("TESTING USER REDUCER", () => {
  it("should return the intial state", () => {
    expect(userReducer(undefined, {})).toEqual({
      currentUser: null,
      signupError: null,
      loginError: null,
      isAuthenticated: false,
    });
  });

  it("should return the after login state", () => {
    expect(
      userReducer(
        {
          currentUser: null,
          signupError: null,
          loginError: null,
          isAuthenticated: false,
        },
        {
          type: ACTIONS.LOGIN,
          user: { _id: "1" },
        }
      )
    ).toEqual({
      currentUser: { _id: "1" },
      signupError: null,
      loginError: null,
      isAuthenticated: true,
    });
  });

  it("should return the after logout state", () => {
    expect(
      userReducer(
        {
          currentUser: { _id: "1" },
          signupError: null,
          loginError: null,
          isAuthenticated: true,
        },
        {
          type: ACTIONS.LOGOUT,
        }
      )
    ).toEqual({
      currentUser: null,
      signupError: null,
      loginError: null,
      isAuthenticated: false,
    });
  });
});
