import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Community.module.css'
import * as communityService from '../../services/communityService'
import PostForm from '../../components/PostForm/PostForm'

const Community = () => {
  const { communityId } = useParams()
  const [community, setCommunity] = useState({})

  useEffect(() => {
    const fetchCommunity = async () => {
      const data = await communityService.getCommunityById(communityId)
      setCommunity(data)
    }
    fetchCommunity()
  }, [communityId])

  console.log(community)

  return (
    <main>
      {community.communityMembers? (<div className={styles.container}>
        <h1 className={styles.header}>{community.teamName}</h1>
        <p>Community Members: {community.communityMembers.length}</p>
        <PostForm />
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga optio illo aliquam, cum aut, quam ipsam repudiandae, iure repellat sint consequuntur excepturi laudantium voluptate officiis nemo possimus officia quidem ratione!</h3>
      </div>) : (
        <p>loading..</p>
      )}
    </main>
  )
}

export default Community