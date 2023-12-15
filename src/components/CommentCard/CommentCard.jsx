// npm modules 
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { formatDistanceToNow } from 'date-fns'

// components
import ReplyForm from '../ReplyForm/ReplyForm'

// services
import * as notificationService from '../../services/notificationService'
import * as commentService from '../../services/commentService'

// styles 
import styles from './CommentCard.module.css'

const CommentCard = (props) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState(props.comment.replies)
  
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm)
  }

  const toggleReplies = () => {
    setShowReplies(!showReplies)
  }

  const handleAddReply = async ( replyFormData) => {
    const newReply = await commentService.createReply(props.blogId, props.comment._id, replyFormData)
    setReplies((prevReplies) => [newReply, ...prevReplies ])
    const typeFormData = {
      type: 'Reply',
    }
    await notificationService.createCommentNotification(props.blogId, props.comment._id, typeFormData)
  }

  return (
    <div>

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
        <button onClick={toggleReplyForm}>
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        <button onClick={toggleReplies}>
          {showReplies ? 'Hide Replies' : 'See Replies'}
        </button>
      </div>
        {showReplyForm && <ReplyForm handleAddReply={handleAddReply}/>}
      </div>
    </div>
      {showReplies && (
        <div className={styles.repliesContainer}>
          {replies.map((reply) => (
            <div key={reply._id} className={styles.reply}>
              <div className={styles.replyP}>
              <img className={styles.replyImg} src={reply.author.photo} width={30} alt="" />
              <span><small className={styles.replyAuthor}>{reply.author.name}</small> <small className={styles.replyContent}>{reply.content}</small> <small>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</small></span>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
  )
}

export default CommentCard