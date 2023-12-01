import { useState } from 'react'
import styles from './PostCard.module.css';
import ReplyForm from '../ReplyForm/ReplyForm';

const PostCard = (props) => {
  const [showReplyForm, setShowReplyForm] = useState(false)

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.userInfo}>
        <img src={props.post.author.photo} alt={props.post.author.name} className={styles.userPhoto} />
        <h2 className={styles.userName}>{props.post.author.name}</h2>
      </div>
      <p>{props.post.content}</p>
      {props.post.photo && <img src={props.post.photo} alt="Post" className={styles.postImage} />}
      <button className={styles.replyButton} onClick={toggleReplyForm}>Reply</button>
      {showReplyForm && <ReplyForm />}
    </div>
  )
}

export default PostCard
