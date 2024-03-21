// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

// services
import * as communityService from '../../services/communityService'
import * as postService from '../../services/postService'

// components
import PostForm from '../../components/PostForm/PostForm'
import PostCard from '../../components/PostCard/PostCard'

// styles 
import styles from './Community.module.css'

const Community = (props) => {
  const { communityId } = useParams()
  const [community, setCommunity] = useState({})

  useEffect(() => {
    const fetchCommunity = async () => {
      const data = await communityService.getCommunityById(communityId)
      setCommunity(data)
    }
    fetchCommunity()
  }, [communityId])


  const handleAddPost = async (postFormData, photoData) => {
    const newPost = await postService.createPost(communityId, postFormData, photoData)
    setCommunity({ ...community, posts: [newPost, ...community.posts] })
  }

  return (
    <main>
      {community.communityMembers ? (
        <div className={styles.container}>
          <img src={community.logo} alt="Team Logo" />
          <h1 className={styles.header}>{community.teamName}</h1>
          <p>Community Members: {community.communityMembers.length}</p>
          <Link to={`/team/${community.teamId}/fixtures`} className={styles.link}>League Standings</Link>
          <PostForm handleAddPost={handleAddPost} />
          {community.posts.length ? (
            community.posts.map((post) => <PostCard key={post._id} post={post} communityId={communityId} user={props.user} />)
          ) : (
            <div className={styles.noPostsContainer}>
              <p>No posts found in this community.</p>
              <p>Why not be the first to start a conversation?</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}

export default Community