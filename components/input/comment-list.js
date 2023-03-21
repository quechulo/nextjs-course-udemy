import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const { comments } = props;

  if (!comments) {
    return <p>Loading</p>;
  } else {
    return (
      <Fragment>
        <ul className={classes.comments}>
          {comments.map((comment) => (
            <li key={comment.date}>
              <p>{comment.comment}</p>
              <div>
                By <address>{comment.email}</address>
              </div>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}


export default CommentList;
