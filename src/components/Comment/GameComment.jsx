import { getTimeInterval } from "../../scripts/global";
import deleteIcon from "../../assets/icons/icon_delete.png";

function Comment({ comment, handleDeleteComment }) {
  return (
    <div className="comment">
      <div className="user-avatar"></div>
      <div className="comment__texts">
        <div className="comment__pair-info">
          <p className="comment__username">{comment.userName}</p>
          <p className="comment__date">{getTimeInterval(comment.timestamp)}</p>
        </div>
        <p className="body-copy">{comment.comment}</p>
        <div className="comment__delete-container">
          <div
            className="comment__delete"
            onClick={() => {
              handleDeleteComment(comment.id);
            }}
          >
            <img
              src={deleteIcon}
              alt="Likes icon to illustrate the likes received by people"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
