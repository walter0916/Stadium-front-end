// npm modules 
import { useState, useEffect } from 'react'
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
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(props.comment.likes.length)
  const [dislikes, setDislikes] = useState(props.comment.dislikes.length)
  const [replies, setReplies] = useState(props.comment.replies)

  useEffect(() => {
    const userLiked = props.comment.likes.some((like) => like.author === props.user.profile)
    setLiked(userLiked)
    const userDisliked = props.comment.dislikes.some((dislike) => dislike.author === props.user.profile)
    setDisliked(userDisliked)
  }, [props.comment.dislikes, props.comment.likes, props.user.profile])
  
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

  const handleAddLike = async () => {
    const formData = { type: 'Like' }
    await commentService.addLikeOrDislike(props.comment._id, formData)
    if (!liked) {
      setLiked(true)
      setLikes((prevLikes) => prevLikes + 1)
      if (disliked) {
        setDisliked(false)
        setDislikes((prevDislikes) => prevDislikes - 1)
      }
      if (!liked & !disliked) {
        await notificationService.createCommentNotification(props.blogId, props.comment._id, formData)
      }
    }
  }

  const handleAddDislike = async () => {
    const formData = { type: 'Dislike' }
    await commentService.addLikeOrDislike(props.comment._id, formData)
    if (!disliked) {
      setDisliked(true)
      setDislikes((prevDislikes) => prevDislikes + 1)
      if (liked) {
        setLiked(false)
        setLikes((prevLikes) => prevLikes - 1)
      }
      if (!liked & !disliked) {
        await notificationService.createCommentNotification(props.blogId, props.comment._id, formData)
      }
    }
  }

  return (
    <>
    <div className={styles.commentCard}>
      <div className={styles.imgContainer}>
        <img src={props.comment.author.photo} alt=""/>
      </div>
      <div className={styles.commentContent}>
        <p className={styles.commentAuthor}>{props.comment.author.name}</p>
        <p className={styles.commentCreatedAt}>{formatDistanceToNow(new Date(props.comment.createdAt), { addSuffix: true })}</p>
        <p>{props.comment.content}</p>
        <div className={styles.buttonsContainer}>
        <button className={styles.thumbsUpButton} onClick={handleAddLike}>
          <FontAwesomeIcon icon={faThumbsUp} size='1x'/>
          {likes > 0 && <span className={styles.likesCount}>{likes}</span>}
        </button>
        <button className={styles.thumbsDownButton} onClick={handleAddDislike}>
          <FontAwesomeIcon icon={faThumbsDown} size='1x'/>
          {dislikes > 0 && <span className={styles.dislikesCount}>{dislikes}</span>}
        </button>
        <button onClick={toggleReplyForm}>
          {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        {replies.length > 0 ?
        (<button onClick={toggleReplies}>
          {showReplies ? 'Hide Replies' : 'See Replies'}
        </button>) : ('')
        }
      </div>
        {showReplyForm && <ReplyForm handleAddReply={handleAddReply}/>}
      </div>
    </div>
      {showReplies && (
        <div className={styles.repliesContainer}>
          {replies.map((reply) => (
            <div key={reply._id} className={styles.reply}>
              <div className={styles.replyP}>
                <img className={styles.replyImg} src={reply.author.photo} width={30} alt="author photo" />
                <div className={styles.replyContentContainer}>
                  <span>
                    <small className={styles.replyAuthor}>{reply.author.name}</small>
                    &nbsp; 
                    <small className={styles.replyContent}>{reply.content}</small>
                  </span>
                  <span>
                    <small>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</small>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </>
  )
}

export default CommentCard