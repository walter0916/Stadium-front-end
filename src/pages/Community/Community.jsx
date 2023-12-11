import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Community.module.css'
import * as communityService from '../../services/communityService'
import * as postService from '../../services/postService'
import PostForm from '../../components/PostForm/PostForm'
import PostCard from '../../components/PostCard/PostCard'

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
    setCommunity({ ...community, posts: [...community.posts, newPost] })
  }

  return (
    <main>
      {community.communityMembers? (<div className={styles.container}>
        <h1 className={styles.header}>{community.teamName}</h1>
        <p>Community Members: {community.communityMembers.length}</p>
        <PostForm handleAddPost={handleAddPost}/>
        {community.posts.map(post => <PostCard key={post._id} post={post} communityId={communityId} user={props.user} />)}
      </div>) : (
        <p>loading..</p>
      )}
    </main>
  )
}

export default Community