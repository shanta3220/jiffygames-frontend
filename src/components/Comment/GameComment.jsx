import { getTimeInterval } from "../../scripts/global";
import deleteIcon from "../../assets/icons/icon_delete.png";
import UserAvatar from "../UserAvatar/UserAvatar";

function Comment({ comment, handleDeleteComment }) {
  return (
    <div className="comment">
      <UserAvatar linkPath={`/users/${comment.user_id}`} />
      <div className="comment__texts">
        <div className="comment__pair-info">
          <p className="comment__username">{comment.user_name}</p>
          <p className="comment__date">{getTimeInterval(comment.created_at)}</p>
        </div>
        <p className="body-copy">{comment.message}</p>
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
