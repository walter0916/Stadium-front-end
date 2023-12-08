import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'
import * as notificationService from '../../services/notificationService'
import styles from './BlogComments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import CommentForm from "../../components/CommentForm/CommentForm";

const BlogComments = (props) => {
  const {blogId} = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.getBlogById(blogId)
      setBlog(data)
    }
    fetchBlog()
  },[blogId])

  const handleAddComment = async (blogId, blogFormData) => {
    const newComment = await blogService.createComment(blogId, blogFormData)
    setBlog({ ...blog, comments: [...blog.comments, newComment]})
    const typeFormData = {
      type: 'Comment',
    }
    await notificationService.createBlogNotification(blogId, typeFormData)
  }

  console.log(blog)

  return (
    <div className={styles.blogCommentsContainer}>
      {blog.author ? (<div className={styles.blogContainer}>
        <img src={blog.photo} alt="" />
        <div className={styles.articleContent}>
          <h2>{blog.title}</h2>
          <p>via {blog.author.name}</p>
        </div>
      </div>
        ) : '' }
        <div className={styles.commentFormContainer}>
          <CommentForm user={props.user} blogId={blog._id} handleAddComment={handleAddComment}/>
        </div>
      {blog.author ? (
              <div className={styles.commentsContainer}>
              { blog.comments.map(comment => 
              <div key={comment._id} className={styles.commentCard}>
                <div className={styles.imgContainer}>
                  <img src={comment.author.photo} alt=""/>
                </div>
                <div className={styles.commentContent}>
                  <p className={styles.commentAuthor}>{comment.author.name}</p>
                  <p className={styles.commentCreatedAt}>{comment.createdAt}</p>
                  <p>{comment.content}</p>
                <div className={styles.buttonsContainer}>
                <button className={styles.thumbsUpButton}>
                  <FontAwesomeIcon icon={faThumbsUp} size='1x'/>
                </button>
                <button className={styles.thumbsDownButton} >
                  <FontAwesomeIcon icon={faThumbsDown} size='1x'/>
                </button>
                  <button>Reply</button>
                </div>
                </div>
              </div>) }
            </div>
      ) : ' '}  
    </div>
  )
}

export default BlogComments