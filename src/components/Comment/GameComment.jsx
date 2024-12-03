import { getTimeInterval } from "../../scripts/global";
import deleteIcon from "../../assets/icons/icon_delete.png";
import likeIcon from "../../assets/icons/icon_like.png";
import UserAvatar from "../UserAvatar/UserAvatar";

function Comment({ comment, handleDeleteComment, handleLikeComment, userId }) {
  return (
    <div className="comment">
      <UserAvatar
        linkPath={`/users/${comment.user_id}`}
        userId={comment.user_id}
      />
      <div className="comment__texts">
        <div className="comment__pair-info">
          <p className="comment__username">{comment.username}</p>
          <p className="comment__date">{getTimeInterval(comment.created_at)}</p>
        </div>
        <p className="body-copy">{comment.message}</p>
        <div className="comment__delete-like-container">
          <div
            className="comment__like"
            onClick={() => {
              handleLikeComment(comment.id);
            }}
          >
            <img src={likeIcon} alt="Like Icon" />
            <p>{comment.like_count}</p>
          </div>
          <div
            style={
              comment.user_id == userId
                ? { display: "visible" }
                : { display: "none" }
            }
            className="comment__delete"
            onClick={() => {
              handleDeleteComment(comment.id);
            }}
          >
            <img src={deleteIcon} alt="Delete Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
