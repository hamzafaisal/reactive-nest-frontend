import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/UI/loader/Loader.js";
import { connect } from "react-redux";
import * as ACTIONS from "../../store/actions/postActions.js";
import { compose } from "redux";

export function SinglePost(props) {
  // useEffect(() => {
  // Axios.get("http://localhost:5000/posts/" + props.match.params.id)
  //   .then((response) => {
  //     const data = response.data;
  //     setpost(data);
  //     setisLoading(false);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  //   props.getPost(props.match.params.id);

  //   return () => {
  //     console.log("unmount");
  //   };
  // }, [props.match.params.id]);

  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <button
        className="btn btn-light mb-3"
        onClick={() => {
          props.history.goBack();
        }}
      >
        <i className="fa fa-backward"></i> Back
      </button>

      {!props.post ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="text-capitalize mb-4">
            {props.post && props.post.title}
          </h1>
          <div className="bg-secondary text-white p-2 mb-3">
            Written by {props.post && props.post.userId.name} on
            {props.post && props.post.created_at}
          </div>
          <p className="text-capitalize">{props.post && props.post.body}</p>

          <hr />
          {props.currentUser._id === (props.post && props.post.userId._id) && (
            <div className="user-controls">
              <Link
                to={"/post/edit/" + props.post._id}
                className="btn btn-dark mr-2"
              >
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => props.onDeletePost(props.post._id)}
              >
                Delete
              </button>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.posts.find((p) => p._id === ownProps.match.params.id),
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeletePost: (id) => dispatch(ACTIONS.deletePost(id, ownProps)),
    // getPost: (id) => dispatch({ type: ACTIONS.GET_POST, postId: id }),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SinglePost);
