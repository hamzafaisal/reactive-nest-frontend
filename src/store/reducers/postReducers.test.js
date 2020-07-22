import { postReducer } from "./postReducers";
// import { ACTIONS } from "../actions/postActions";

describe("TESTING POST REDUCER", () => {
  it("should return the intial state of post reducer", () => {
    expect(postReducer(undefined, {})).toEqual({
      posts: [],
      error: false,
      allPostsLoading: true,
      addPostLoading: false,
    });
  });
});
