// npm modules
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// services
import * as blogService from '../../services/blogService'
import * as notificationService from "../../services/notificationService"
import * as leagueService from '../../services/leagueService'
import * as commentsService from '../../services/commentService'

// styles
import styles from './League.module.css'

// components
import BlogCard from "../../components/BlogCard/BlogCard"

const League = (props) => {
  const { leagueId } = useParams()
  const [league, setLeague] = useState({})
  const [leagueBlogs, setLeagueBlogs] = useState({})
  const [leagueStats, setLeagueStats] = useState({})

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await blogService.getAllBlogs()
      const leagueData = await leagueService.getLeagueById(leagueId)
      const filteredData = data.filter(blog => blog.league._id === leagueId)
      setLeagueBlogs(filteredData)
      setLeague(leagueData)
    }

    fetchBlogs()
  }, [leagueId])

  useEffect(() => {
    const fetchLeagueInfo = async () => {
        const leagueStatsData = await leagueService.getLeagueStats(league.leagueId)
        setLeagueStats(leagueStatsData)
    }

    fetchLeagueInfo()
  }, [league.leagueId])


  const handleAddComment = async (blogId, blogFormData) => {
    const newComment = await commentsService.createComment(blogId, blogFormData)
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
      <img src={league.logo} alt="" className={styles.logo} />
      <h1>{league.name}</h1>
      <Link to={`/league/${league._id}/standings`} state={{ league }} className={styles.standingsLink}>League Standings</Link>
      <Link to={`/league/${league._id}/fixtures`} state={{ league }} className={styles.standingsLink}>League Fixtures</Link>
      <Link to={`/league/${league._id}/playerStats`} state={{ league }} className={styles.standingsLink}>League Player Stats</Link>
      <div className={styles.leagueBlogCards}>
        {leagueBlogs.length ? (
          leagueBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} handleAddComment={handleAddComment} user={props.user} leagueId={leagueId} />
          ))
        ) : (
          <div className={styles.noBlogsContainer}>
            <p className={styles.noBlogsMessage}>Oops! No blogs found for this league.</p>
            <p className={styles.noBlogsMessage}>Why not be the first to share your thoughts?</p>
            <Link to="/blog/new" className={styles.createBlogLink}>
              Create a Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  )  
}

export default League