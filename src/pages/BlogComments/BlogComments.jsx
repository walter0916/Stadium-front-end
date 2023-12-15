// npm modules 
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

// services
import * as blogService from '../../services/blogService'
import * as notificationService from '../../services/notificationService'
import * as commentService from '../../services/commentService'

// components
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentCard from "../../components/CommentCard/CommentCard"

// styles
import styles from './BlogComments.module.css'

const BlogComments = (props) => {
  const {blogId} = useParams()
  const {leagueId} = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.getBlogById(blogId)
      setBlog(data)
    }
    fetchBlog()
  },[blogId])

  const handleAddComment = async (blogId, blogFormData) => {
    const newComment = await commentService.createComment(blogId, blogFormData)
    setBlog({ ...blog, comments: [ newComment, ...blog.comments]})
    const typeFormData = {
      type: 'Comment',
    }
    await notificationService.createBlogNotification(blogId, typeFormData)
  }



  return (
    <div className={styles.blogCommentsContainer}>
      {blog.author ? (<div className={styles.blogContainer}>
        <img src={blog.photo} alt="" />
        <div className={styles.articleContent}>
          <Link to={`/league/${leagueId}/blog/${blogId}`}><h2>{blog.title}</h2></Link>
          <p>via {blog.author.name}</p>
        </div>
      </div>
        ) : '' }
        <div className={styles.commentFormContainer}>
          <CommentForm user={props.user} blogId={blog._id} handleAddComment={handleAddComment} />
        </div>
      {blog.author ? (
              <div className={styles.commentsContainer}>
              { blog.comments.map(comment => <CommentCard key={comment._id} comment={comment} blogId={blogId}/>) }
            </div>
      ) : ' '}  
    </div>
  )
}

export default BlogComments