import React, { Fragment, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/UI/loader/Loader.js";
import * as ACTIONS from "../../store/actions/postActions";
import { connect } from "react-redux";
import { compose } from "redux";

function AddPost(props) {
  const [post, setpost] = useState({
    title: "",
    body: "",
    userId: props.currentUser._id,
  });

  const [titleError, settitleError] = useState("");
  const [bodyError, setbodyError] = useState("");

  const changeHandler = (e) => {
    e.preventDefault();
    setpost({ ...post, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onLoading(true);

    const inputChecker = () => {
      let isTitleValid = true;
      let isBodyValid = true;

      if (post.title === "") {
        settitleError("is-invalid");
        isTitleValid = false;
      } else {
        settitleError("is-valid");
        isTitleValid = true;
      }

      if (post.body === "" || post.body.length < 5) {
        setbodyError("is-invalid");
        isBodyValid = false;
      } else {
        setbodyError("is-valid");
        isBodyValid = true;
      }

      if (isTitleValid && isBodyValid) {
        return true;
      } else {
        props.onLoading(false);
        return false;
      }
    };

    if (inputChecker()) {
      props.onAddPost({ ...post });
    }
  };

  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <button
        className="btn btn-light"
        onClick={() => {
          props.history.goBack();
        }}
      >
        <i className="fa fa-backward"></i> Back
      </button>

      {props.isLoading ? (
        <Loader />
      ) : (
        <div className="card card-body bg-light mt-2">
          <h2>Add Post</h2>
          <p>Create a post with this form</p>
          <form>
            <div className="form-group">
              <label htmlFor="title">
                Title: <sup>*</sup>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control form-control ${titleError}`}
                onChange={changeHandler}
              />
              <span className="invalid-feedback"></span>
            </div>
            <div className="form-group">
              <label htmlFor="body">
                Body: <sup>*</sup>
              </label>
              <textarea
                name="body"
                onChange={changeHandler}
                className={`form-control form-control ${bodyError}`}
              ></textarea>
              <span className="invalid-feedback"></span>
            </div>
            <button onClick={submitHandler} className="btn btn-success">
              Add Post
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.post.error,
    isLoading: state.post.addPostLoading,
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddPost: (post) => dispatch(ACTIONS.addPost(post, ownProps)),
    onLoading: (state) => dispatch(ACTIONS.addPostLoading(state)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AddPost);

// if (post.body === "" || post.body.length < 5) {
//   seterror((prevState) => {
//     return { ...prevState, bodyErr: "is-invalid" };
//   });
// } else {
//   seterror((prevState) => {
//     return { ...prevState, bodyErr: "is-valid" };
//   });
// }

// if (post.title === "") {
//   seterror((prevState) => {
//     return { ...prevState, titleErr: "is-invalid" };
//   });
// } else {
//   seterror((prevState) => {
//     return { ...prevState, titleErr: "is-valid" };
//   });
// }
