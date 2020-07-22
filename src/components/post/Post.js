import React from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="card card-body mb-3 text-capitalize" key={post.id}>
      <h4 className="card-titles">{post.title}</h4>
      <div className="bg-light py-2 mb-3">
        Written by {post.userId.name} on {post.created_at}
      </div>
      <p className="card-text ">{post.body}</p>
      <Link to={"/post/" + post._id} className="btn btn-dark">
        More
      </Link>
    </div>
  );
}
