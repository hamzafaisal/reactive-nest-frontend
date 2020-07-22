import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Post from "../components/post/Post";
import Loader from "../components/UI/loader/Loader.js";
import { connect } from "react-redux";
import * as ACTIONS from "../store/actions/postActions.js";

function Home(props) {
  useEffect(() => {
    props.onFetchPosts();
  }, []);

  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <div className="row mb-3">
        <div className="col-md-6">
          <h1>Posts</h1>
        </div>
        <div className="col-md-6">
          <Link to="/add-post" className="btn btn-secondary pull-right">
            Add Post
          </Link>
        </div>
      </div>
      {props.isLoading ? (
        <Loader />
      ) : !props.error ? (
        props.posts && props.posts.length ? (
          props.posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <h2 className="text-center">No Posts</h2>
        )
      ) : (
        <h2 className="text-center">{props.error}</h2>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    error: state.post.error,
    isLoading: state.post.allPostsLoading,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPosts: () => dispatch(ACTIONS.fetchPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
