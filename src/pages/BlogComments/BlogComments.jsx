import { useState } from "react"
import { useParams } from "react-router-dom"
import * as blogService from '../../services/blogService'

const BlogComments = () => {
  const {blogId} = useParams()
  const [blog, setBlog] = useState({})

  return (
    <div>

    </div>
  )
}

export default BlogComments