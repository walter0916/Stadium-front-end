// npm modules 
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// services
import * as blogService from '../../services/blogService'

// styles
import styles from './UsersBlogs.module.css'

const UsersBlogs = (props) => {
  const [blogs, setBlogs] = useState({})

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const data = await blogService.getUsersBlogs(props.profile._id)
      setBlogs(data)
    }
    fetchUserBlogs()
  }, [props.profile._id])

  console.log(blogs)

  return (
    <div className={styles.container}>
      {blogs.length ? 
        <div className={styles.blogContainer}>
          {blogs.map((blog) => 
            <div key={blog._id} className={styles.blogCard}>
              <div className={styles.overlay}>
                <Link to={`/league/${blog.league._id}/blog/${blog._id}`}>
                  <h3>{blog.title}</h3>
                </Link>
              </div>
              <img src={blog.photo} alt="" />
            </div>) }
        </div> : ''} 
    </div>
  )
}

export default UsersBlogs