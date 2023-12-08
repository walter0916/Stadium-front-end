import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'
import * as notificationService from '../../services/notificationService'
import styles from './BlogComments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import CommentForm from "../../components/CommentForm/CommentForm";
import ReplyForm from "../../components/ReplyForm/ReplyForm"
import CommentCard from "../../components/CommentCard/CommentCard"

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

  const handleAddReply = async (commentId, replyFormData) => {
    const newReply = await blogService.createReply(blogId, commentId, replyFormData)
  }



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
          <CommentForm user={props.user} blogId={blog._id} handleAddComment={handleAddComment} />
        </div>
      {blog.author ? (
              <div className={styles.commentsContainer}>
              { blog.comments.map(comment => <CommentCard key={comment._id} comment={comment} handleAddReply={handleAddReply}/>) }
            </div>
      ) : ' '}  
    </div>
  )
}

export default BlogComments