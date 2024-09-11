// npm modules
import { useState } from "react"
import { Link } from "react-router-dom"

// components
import SearchBar from "../TeamSearchBar/TeamSearchBar"
import CreateCommunityForm from "../CreateCommunityForm/CreateCommunityForm"

// services
import * as communityService from '../../services/communityService'

// styles
import styles from './CommunitiesHub.module.css'

const CommunitiesHub = (props) => {
  const [joinedCommunities, setJoinedCommunities] = useState(props.profile.joinedCommunities)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLeaveCommunity = async (communityId) => {
    try {
      setLoading(true)
      await communityService.leaveCommunity(communityId)
      setJoinedCommunities(joinedCommunities.filter(community => community._id !== communityId))
    } catch (error) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.communitiesHub}>
      <h1>Joined Communities</h1>
      <div className={styles.joinedCommunitiesSection}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {joinedCommunities.map((community) => (
          <div key={community._id} className={styles.communityCard}>
            <Link to={`/community/${community._id}`}><img src={community.logo} alt="" /></Link>
            <button onClick={() => handleLeaveCommunity(community._id)} disabled={loading} className={styles.leaveButton}>
              {loading ? 'Leaving...' : 'Leave'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunitiesHub
