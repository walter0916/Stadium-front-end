import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import * as notificationService from "../../services/notificationService";
import * as blogService from '../../services/blogService'
import CommentForm from '../CommentForm/CommentForm';
import styles from './BlogCard.module.css'

const BlogCard = (props) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleAddLike = async () => {
    const formData = { type: 'Like' }
    await blogService.addLikeOrDislike(props.blog._id, formData)
    if (!liked) {
      setLiked(true)
      if (disliked) {
        setDisliked(false)
      }
      if (!liked & !disliked) {
        await notificationService.createPostNotification(props.blog._id, formData)
      }
    }
  }

  const handleAddDislike = async () => {
    const formData = { type: 'Dislike' }
    await blogService.addLikeOrDislike(props.blog._id, formData)
    if (!disliked) {
      setDisliked(true)
      if (liked) {
        setLiked(false)
      }
      if (!liked & !disliked) {
        await notificationService.createPostNotification(props.blog._id, formData)
      }
    }
  }

  return (
    <div className={styles.leagueBlogCardContainer}>
      <div className={styles.leagueBlogCard}>
        <img src={props.blog.photo} alt="" />
        <div className={styles.articleContent}>
          <h2>{props.blog.title}</h2>
          <p>via {props.blog.author.name}</p>
        </div>
      </div>
      <button className={styles.thumbsUpButton} onClick={handleAddLike}>
        <FontAwesomeIcon icon={faThumbsUp} size='2x'/>
      </button>
      <button className={styles.thumbsDownButton} onClick={handleAddDislike}>
        <FontAwesomeIcon icon={faThumbsDown} size='2x'/>
      </button>
        {props.blog.comments.length > 0 ? (<Link to={`blog/${props.blog._id}/comments`} className={styles.commentNum}>view all {props.blog.comments.length} comments</Link>) : ('')}
          <div className={styles.commentFormContainer}>
          <CommentForm user={props.user} handleAddComment={props.handleAddComment} blogId={props.blog._id}/>
          </div>
    </div>
  )
}

export default BlogCard