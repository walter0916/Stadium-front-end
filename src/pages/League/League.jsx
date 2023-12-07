import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'
import styles from './league.module.css'

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

  return (
    <div className={styles.leagueContainer}>
      <h1>La Liga</h1>
      <div className={styles.leagueBlogCards}>
        {leagueBlogs.length ? leagueBlogs.map((blog) => (<div key={blog._id} className={styles.leagueBlogCard}>
          <img src={blog.photo} alt="" />
          <div className={styles.articleContent}>
          <h2>{blog.title}</h2>
          <p>via {blog.author.name}</p>
          </div>
        </div>)) : ''}
      </div>
    </div>
  )  
}

export default League