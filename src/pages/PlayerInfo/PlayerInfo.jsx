// npm services
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// services 
import * as profileService from '../../services/profileService'

const PlayerInfo = () => {
  const { playerId, teamId } = useParams()
  const [playerInfo, setPlayerInfo] = useState([])
  console.log(playerId)

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      const data = await profileService.getPlayerInfoById(playerId, teamId, 2023)
      const filteredData = data.response
      setPlayerInfo(filteredData)
    }
    fetchPlayerInfo()
  },[playerId, teamId])

  return (
    <div>

    </div>
  )
}

export default PlayerInfo