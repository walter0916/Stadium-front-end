// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

// services
import * as notificationService from "../../services/notificationService"
import * as blogService from '../../services/blogService'

// components
import CommentForm from '../CommentForm/CommentForm'

// styles
import styles from './BlogCard.module.css'

const BlogCard = (props) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const userLiked = props.blog.likes.some((like) => like.author === props.user.profile)
    setLiked(userLiked);
  }, [props.user.profile, props.blog.likes])

  const handleAddLike = async () => {
    const formData = { type: 'Like' }
    await blogService.addLikeOrDislike(props.blog._id, formData)
    if (!liked) {
      setLiked(true)
      if (!liked ) {
        await notificationService.createBlogNotification(props.blog._id, formData)
      }
    }
  }


  return (
    <div className={styles.leagueBlogCardContainer}>
      <div className={styles.leagueBlogCard}>
        <img src={props.blog.photo} alt="" />
        <div className={styles.articleContent}>
          <Link to={`/league/${props.leagueId}/blog/${props.blog._id}`}><h2>{props.blog.title}</h2></Link>
          <p>via {props.blog.author.name}</p>
        </div>
      </div>
        <button
          className={`${styles.likeButton} ${liked ? styles.liked : styles.notLiked}`}
          onClick={handleAddLike}
          >
          <FontAwesomeIcon icon={faFire} size='2x' />
        </button>
        {props.blog.comments.length > 0 ? (<Link to={`blog/${props.blog._id}/comments`} className={styles.commentNum}>view all {props.blog.comments.length} comments</Link>) : ('')}
          <div className={styles.commentFormContainer}>
          <CommentForm user={props.user} handleAddComment={props.handleAddComment} blogId={props.blog._id}/>
          </div>
    </div>
  )
}

export default BlogCard