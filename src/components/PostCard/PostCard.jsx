import { useState } from 'react'
import styles from './PostCard.module.css';
import ReplyForm from '../ReplyForm/ReplyForm';
import * as communityService from '../../services/communityService'
import * as notificationService from '../../services/notificationService'

const PostCard = (props) => {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  console.log(props.post._id)
  console.log(props.communityId)

  const handleAddReply = async (replyFormData) => {
    await communityService.createReply(props.communityId, props.post._id, replyFormData)
    const formData = { type : "Reply" }
    await notificationService.createPostNotification(props.communityId, props.post._id, formData)
  }

  const originalDate = new Date(props.post.createdAt)

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
      <p><small>{formattedDate}</small></p>
      <button className={styles.replyButton} onClick={toggleReplyForm}>Reply</button>
      {showReplyForm && <ReplyForm handleAddReply={handleAddReply} />}
    </div>
  )
}

export default PostCard
