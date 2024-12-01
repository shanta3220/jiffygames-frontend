import Comment from "../Comment/GameComment";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./GameComments.scss";
import { useRef, useState, useEffect } from "react";

function Comments({ comments, handlePostNewComment, handleDeleteComment }) {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const errorUpdateAfterDelay = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorCommentMessage = getErrorMessage(comment);
    if (errorCommentMessage) {
      setCommentError(errorCommentMessage);
      return;
    }
    handlePostNewComment(comment); // Use state comment value directly
    setCommentError("");
    setComment("");
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);

    // Changing errorState on Timeout, to prevent error state changing on each keystroke
    if (errorUpdateAfterDelay.current) {
      clearTimeout(errorUpdateAfterDelay.current);
    }
    errorUpdateAfterDelay.current = setTimeout(() => {
      setCommentError(getErrorMessage(value));
    }, 300);
  };

  // edge case: if users navigate away quickly, clean up the timeout during unmounting
  useEffect(() => {
    return () => {
      if (errorUpdateAfterDelay.current)
        clearTimeout(errorUpdateAfterDelay.current);
    };
  }, []);

  const getErrorMessage = (comment) =>
    comment.trim() ? "" : "Comment cannot be empty or whitespace.";

  return (
    <section className="comments">
      <h3 className="comments__header">{`${comments.length} Comments`}</h3>

      <section className="comments__and-form">
        <div className="comment-form-container">
          <UserAvatar />
          <form className="comment-form" onSubmit={handleSubmit}>
            <label className="comment-form__label">
              <textarea
                id="comment"
                className="comment-form__comment"
                name="comment"
                placeholder="Add a new comment"
                autoComplete="off"
                required
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              {commentError && (
                <p className="comment-form__error-message">{commentError}</p>
              )}
            </label>
            <button className="comment-form__button" type="submit">
              Comment
            </button>
          </form>
        </div>

        <div className="comments__container">
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              id={comment.id}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Comments;
