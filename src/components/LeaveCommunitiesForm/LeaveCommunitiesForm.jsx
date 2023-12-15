// npm modules
import { useState, useEffect } from "react"

// components 
import SearchBar from "../SearchBar/SearchBar"

// services 
import * as communityService from '../../services/communityService'

const LeaveCommunitiesForm = (props) => {
const [joinedCommunities, setJoinedCommunities] = useState(props.profile.joinedCommunities)

const handleLeaveCommunities = async (communityId) => {
  await communityService.leaveCommunity(communityId)
}

console.log(props.profile)
  return (
    <div>
      <h1>
        Find communities to join 
      </h1>
      <SearchBar />
      <h1>Joined Communities</h1>
      {joinedCommunities.map((community) => 
        <div key={community._id}>
          <h1>{community.teamName}</h1>
          <button onClick={() => handleLeaveCommunities(community._id)}>Leave</button>
        </div>)}
      <h3>Didn't find what you were looking for? create your own community</h3>
    </div>
  )
}

export default LeaveCommunitiesForm