import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [ comments, setComments ] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
    .then((response) => response.json())
    .then((data) => {
      setComments(data.comments);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    const { id, email, name, comment } = commentData;
    
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, email: email, name: name, comment: comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // send valid data to API
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
