import React, { Fragment, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import * as ACTIONS from "../../store/actions/postActions.js";

function EditPost(props) {
  const [post, setpost] = useState({
    title: props.post && props.post.title,
    body: props.post && props.post.body,
    userId: props.currentUser._id,
    created_at: props.post && props.post.created_At,
  });

  // useEffect(() => {
  //   Axios.get("http://localhost:5000/posts/" + props.match.params.id)
  //     .then((response) => {
  //       const { title, body, userId, created_at } = response.data;
  //       setpost({
  //         title,
  //         body,
  //         userId,
  //         created_at,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [props.match.params.id]);

  const [titleError, settitleError] = useState("");
  const [bodyError, setbodyError] = useState("");

  const changeHandler = (e) => {
    e.preventDefault();
    setpost({ ...post, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

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
      } else return false;
    };

    if (inputChecker()) {
      props.onUpdatePost({ ...post });
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
      <div className="card card-body bg-light mt-2">
        <h2>Edit Post</h2>
        <p>Edit post with this form</p>
        <form>
          <div className="form-group">
            <label htmlFor="title">
              Edit Title: <sup>*</sup>
            </label>
            <input
              type="text"
              name="title"
              className={`form-control form-control ${titleError}`}
              onChange={changeHandler}
              value={post.title}
            />
            <span className="invalid-feedback"></span>
          </div>
          <div className="form-group">
            <label htmlFor="body">
              Edit Body: <sup>*</sup>
            </label>
            <textarea
              rows="5"
              name="body"
              onChange={changeHandler}
              className={`form-control form-control ${bodyError}`}
              value={post.body}
            ></textarea>
            <span className="invalid-feedback"></span>
          </div>
          <button onClick={submitHandler} className="btn btn-success">
            Edit Post
          </button>
        </form>
      </div>
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
    onUpdatePost: (post) => dispatch(ACTIONS.updatePost(post, ownProps)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EditPost);
