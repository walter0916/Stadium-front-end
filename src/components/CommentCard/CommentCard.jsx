import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import styles from './CommentCard.module.css'
import ReplyForm from '../ReplyForm/ReplyForm';

const CommentCard = (props) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm)
  }

  return (
    <div className={styles.commentCard}>
      <div className={styles.imgContainer}>
        <img src={props.comment.author.photo} alt=""/>
      </div>
      <div className={styles.commentContent}>
        <p className={styles.commentAuthor}>{props.comment.author.name}</p>
        <p className={styles.commentCreatedAt}>{props.comment.createdAt}</p>
        <p>{props.comment.content}</p>
        <div className={styles.buttonsContainer}>
        <button className={styles.thumbsUpButton}>
          <FontAwesomeIcon icon={faThumbsUp} size='1x'/>
        </button>
        <button className={styles.thumbsDownButton} >
          <FontAwesomeIcon icon={faThumbsDown} size='1x'/>
        </button>
        <button onClick={toggleReplyForm}>Reply</button>
      </div>
        {showReplyForm && <ReplyForm />}
      </div>
    </div>
  )
}

export default CommentCard