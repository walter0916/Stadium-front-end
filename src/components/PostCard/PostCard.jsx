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

  const postFormattedDate = originalDate.toLocaleString('en-US', {
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
        <small>{postFormattedDate}</small>
      </p>
      <div className={styles.buttonsContainer}>
      <button className={styles.replyButton} onClick={toggleReplyForm}>
        {showReplyForm ? 'Cancel' : 'Reply'}
      </button>
      <button className={styles.repliesButton} onClick={toggleReplies}>
        {showReplies ? 'Hide Replies' : 'See Replies'}
      </button>
      </div>
      {showReplyForm && <ReplyForm handleAddReply={handleAddReply} />}
      {showReplies && (
        <div className={styles.repliesContainer}>
          {props.post.replies.map((reply) => (
            <div key={reply._id} className={styles.reply}>
              <div className={styles.replyP}>
              <img className={styles.replyImg} src={reply.author.photo} width={30} alt="" />
              <span><small className={styles.replyAuthor}>{reply.author.name}</small> <small className={styles.replyContent}>{reply.content}</small></span>
              </div>
            <small className={styles.replyDate}>
            {new Date(reply.createdAt).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
            </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
