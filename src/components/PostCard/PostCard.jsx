import { useState } from 'react';
import styles from './PostCard.module.css';
import ReplyForm from '../ReplyForm/ReplyForm';
import * as communityService from '../../services/communityService';
import * as notificationService from '../../services/notificationService';

const PostCard = (props) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleAddReply = async (replyFormData) => {
    await communityService.createReply(props.communityId, props.post._id, replyFormData);
    const formData = { type: 'Reply' };
    await notificationService.createPostNotification(props.communityId, props.post._id, formData);
  };

  const originalDate = new Date(props.post.createdAt);

  const formattedDate = originalDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className={styles.postCard}>
      <div className={styles.userInfo}>
        <img src={props.post.author.photo} alt={props.post.author.name} className={styles.userPhoto} />
        <h2 className={styles.userName}>{props.post.author.name}</h2>
      </div>
      <p>{props.post.content}</p>
      {props.post.photo && <img src={props.post.photo} alt="Post" className={styles.postImage} />}
      <p>
        <small>{formattedDate}</small>
      </p>
      <button className={styles.replyButton} onClick={toggleReplyForm}>
        Reply
      </button>
      <button className={styles.repliesButton} onClick={toggleReplies}>
        {showReplies ? 'Hide Replies' : 'See Replies'}
      </button>
      {showReplyForm && <ReplyForm handleAddReply={handleAddReply} />}
      {showReplies && (
        <div className={styles.repliesContainer}>
          {props.post.replies.map((reply) => (
            <div key={reply._id} className={styles.reply}>
              <p>{reply.content}</p>
              <small>{/* Add date formatting for replies */}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
