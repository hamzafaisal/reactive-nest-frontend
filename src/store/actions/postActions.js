import Axios from "axios";

export const ACTIONS = {
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  GET_POST: "GET_POST",
  UPDATE_POST: "UPDATE_POST",
  FETCH_POST: "FETCH_POST",
  FETCH_POST_ERROR: "FETCH_POST_ERROR",
  ADD_POST_LOADING: "ADD_POST_LOADING",
};

export const addPostLoading = (state) => {
  return {
    type: ACTIONS.ADD_POST_LOADING,
    loadingState: state,
  };
};

export const addPostToStore = (post) => {
  return {
    type: ACTIONS.ADD_POST,
    newPost: post,
  };
};

export const addPost = (post, ownProps) => {
  return (dispatch) => {
    Axios.post(`${process.env.REACT_APP_NEST_APP_BACKEND_URL}/posts`, {
      ...post,
    })
      .then((response) => {
        dispatch(addPostToStore({ ...response.data }));
        ownProps.history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const updatePostToStore = (post) => {
  return {
    type: ACTIONS.UPDATE_POST,
    post: post,
  };
};

export const updatePost = (post, ownProps) => {
  return (dispatch) => {
    Axios.patch(
      `${process.env.REACT_APP_NEST_APP_BACKEND_URL}/posts/` +
        ownProps.match.params.id,
      {
        ...post,
      }
    )
      .then(() => {
        dispatch(updatePostToStore(post));
        ownProps.history.push("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePostFromStore = (id) => {
  return {
    type: ACTIONS.DELETE_POST,
    id: id,
  };
};

export const deletePost = (id, ownProps) => {
  return (dispatch) => {
    Axios.delete(`${process.env.REACT_APP_NEST_APP_BACKEND_URL}/posts/` + id)
      .then(() => {
        dispatch(deletePostFromStore(id));
        ownProps.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setPostsToStore = (posts) => {
  return {
    type: ACTIONS.FETCH_POST,
    posts,
  };
};

export const fetchPostsError = (error) => {
  return {
    type: ACTIONS.FETCH_POST_ERROR,
    error,
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_NEST_APP_BACKEND_URL}/posts`)
      .then((response) => {
        const data = response.data;
        dispatch(setPostsToStore(data));
      })
      .catch((error) => {
        dispatch(fetchPostsError(error.message));
      });
  };
};
