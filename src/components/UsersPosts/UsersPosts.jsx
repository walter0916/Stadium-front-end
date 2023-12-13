// npm modules
import { useState, useEffect } from "react";

//services 
import * as postService from '../../services/postService';

// styles
import styles from './UsersPosts.module.css'

const UsersPosts = (props) => {
  const [posts, setPosts] = useState({})

  useEffect(() => {
    const fetchUserPosts = async () => {
      const data = await postService.getUserPosts(props.profile._id)
      setPosts(data)
    }
    fetchUserPosts()
  }, [props.profile._id])

  console.log(posts)

  return (
    <div className={styles.container}>
      {posts.length ? 
        <div className={styles.postContainer}>
          {posts.map((post) => 
            <div key={post._id} className={styles.postCard}>
              <div className={styles.overlay}>
                <h3>{post.content}</h3>
              </div>
              <img src={post.photo} alt="" />
            </div>) }
        </div> : ''} 
    </div>
  )
}

export default UsersPosts;