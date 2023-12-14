// npm modules
import { useState, useEffect } from "react";

// services 
import * as communityService from '../../services/communityService'

const LeaveCommunitiesForm = (props) => {
const [joinedCommunities, setJoinedCommunities] = useState(props.profile.joinedCommunities);

const handleLeaveCommunities = async (communityId) => {
  await communityService.leaveCommunity(communityId)
}

console.log(props.profile)
  return (
    <div>
      <h1>Joined Communities</h1>
      {joinedCommunities.map((community) => 
        <div key={community._id}>
          <h1>{community.teamName}</h1>
          <button onClick={() => handleLeaveCommunities(community._id)}>Leave</button>
        </div>)}
    </div>
  )
}

export default LeaveCommunitiesForm;