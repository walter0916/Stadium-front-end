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

// images
import laliga from '../../assets/laliga.svg'
import premierLeagueLogo from '../../assets/premier-league.svg'
import serieALogo from '../../assets/serieA.svg'
import bundesligaLogo from '../../assets/bundesliga.svg'
import mlsLogo from '../../assets/mls.svg'
import ligue1Logo from '../../assets/ligue-1.svg'
import europaLogo from '../../assets/europa.svg'
import championsLogo from '../../assets/champions.svg'

const League = (props) => {
  const { leagueId } = useParams()
  const [league, setLeague] = useState({})
  const [leagueBlogs, setLeagueBlogs] = useState({})
  const [standings, setStandings] = useState({})

  let logo = null
  let standingsId = null

  if (league.leagueName && typeof league.leagueName === 'string') {
    switch (league.leagueName.toLowerCase()) {
      case 'laliga':
        logo = laliga
        standingsId = 140
        break
      case 'premier league':
        logo = premierLeagueLogo
        standingsId = 39
        break
      case 'serie a':
        logo = serieALogo
        standingsId = 71
        break
      case 'bundesliga':
        logo = bundesligaLogo
        standingsId = 78
        break
      case 'mls':
        logo = mlsLogo
        standingsId = 253
        break
      case 'ligue 1':
        logo = ligue1Logo
        standingsId = 61
        break
      case 'champions league':
        logo = championsLogo
        standingsId = 2
        break
      case 'europa league':
        logo = europaLogo
        standingsId = 3
        break
      default:
        logo = laliga
        break
    }
  }


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
    const fetchStandings = async () => {
      if (standingsId !== null) {
        const standingsData = await leagueService.getStandings(standingsId)
        const filteredData = standingsData.response[0].league.standings
        setStandings(filteredData)
      }
    }

    fetchStandings()
  }, [standingsId])


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
      <img src={logo} alt="" className={styles.logo} />
      <h1>{league.leagueName}</h1>
      <Link to={`/league/${league._id}/standings`} state={{ standings }} className={styles.standingsLink}>League Standings</Link>
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