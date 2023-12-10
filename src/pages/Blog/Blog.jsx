import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'
import styles from './Blog.module.css'

const Blog = () => {
  const { blogId } = useParams()
  const [blog, setBlog] = useState({})

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.getBlogById(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [blogId])

  const originalDate = new Date(blog.createdAt)

  const blogFormattedDate = originalDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return (
    <div className={styles.blogContainer}>
      {blog.title ? (
        <div className={styles.blog}>
        <h1>{blog.title}</h1>
        <h4>{blogFormattedDate}</h4>
        <img src={blog.photo} alt="" />
        <p>{blog.content}</p>
        </div>
      ) : ''}
    </div>
  )
}

export default Blog