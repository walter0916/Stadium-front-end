// npm modules 
import { useState, useEffect } from "react"

// services
import * as blogService from '../../services/blogService'

const UsersBlogs = (props) => {
  const [blogs, setBlogs] = useState({})
  console.log(props.profile)

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const data = await blogService.getUsersBlogs(props.profile._id)
      setBlogs(data)
    }
    fetchUserBlogs()
  }, [props.profile._id])

  console.log(blogs)

  return (
    <div>
      {blogs.length ? 
        <div>
          {blogs.map((blog) => <p>{blog.title}</p>) }
        </div> : ''} 
    </div>
  )
}

export default UsersBlogs;