import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'
import styles from './league.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import CommentForm from "../../components/CommentForm/CommentForm";
import * as notificationService from "../../services/notificationService";

const League = (props) => {
  const { leagueId } = useParams()
  const [leagueBlogs, setLeagueBlogs] = useState({})

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogService.getAllBlogs()
      const filteredData = data.filter(blog => blog.league._id === leagueId)
      setLeagueBlogs(filteredData)
    }
    fetchBlogs()
  },[leagueId])

  const handleAddComment = async (blogId, blogFormData) => {
    const newComment = await blogService.createComment(blogId, blogFormData)
    const blogIndex = leagueBlogs.findIndex((blog) => blog._id === blogId)
    const updatedLeagueBlogs = [...leagueBlogs]
    updatedLeagueBlogs[blogIndex] = {
      ...updatedLeagueBlogs[blogIndex],
      comments: [...updatedLeagueBlogs[blogIndex].comments, newComment],
    }
    setLeagueBlogs(updatedLeagueBlogs)
    const typeFormData = {
      type: 'Comment',
    }
    await notificationService.createBlogNotification(blogId, typeFormData)
  }

  return (
    <div className={styles.leagueContainer}>
      <h1>La Liga</h1>
      <div className={styles.leagueBlogCards}>
        {leagueBlogs.length ? leagueBlogs.map((blog) => (<div key={blog._id} className={styles.leagueBlogCardContainer}>
          <div className={styles.leagueBlogCard}>
          <img src={blog.photo} alt="" />
          <div className={styles.articleContent}>
          <h2>{blog.title}</h2>
          <p>via {blog.author.name}</p>
          </div>
          </div>
          {blog.comments.length > 0 ? (<p className={styles.commentNum}>view all {blog.comments.length} comments</p>) : ('')}
          <div className={styles.commentFormContainer}>
          <CommentForm user={props.user} handleAddComment={handleAddComment} blogId={blog._id}/>
          </div>
        </div>)) : ''}
      </div>
    </div>
  )  
}

export default League