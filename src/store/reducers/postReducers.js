import { ACTIONS } from "../actions/postActions";

const initialState = {
  posts: [],
  error: false,
  allPostsLoading: true,
  addPostLoading: false,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return {
        ...state,
        // posts: state.posts.concat({ ...action.newPost }),
        addPostLoading: false,
      };

    case ACTIONS.UPDATE_POST:
      return {
        ...state,
      };

    case ACTIONS.DELETE_POST:
      let post = state.posts.filter((p) => p._id !== action.postId);
      return {
        ...state,
        posts: post,
      };

    case ACTIONS.FETCH_POST:
      return {
        ...state,
        posts: action.posts,
        error: false,
        allPostsLoading: false,
      };

    case ACTIONS.FETCH_POST_ERROR:
      return {
        ...state,
        error: action.error,
        allPostsLoading: false,
      };

    case ACTIONS.ADD_POST_LOADING:
      return {
        ...state,
        addPostLoading: action.loadingState,
      };

    default:
      return state;
  }
};
