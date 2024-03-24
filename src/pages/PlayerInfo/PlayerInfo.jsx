// npm services
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// services 
import * as profileService from '../../services/profileService'

import styles from './PlayerInfo.module.css'

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
    <div className={styles.mainContainer}>
      {playerInfo.length > 0 ? (
        (playerInfo.map( player => 
          <div key={player.player.id} className={styles.PlayerInfo}>
            <h2>{player.player.name}</h2>
            <img src={player.player.photo} alt="player photo" className={styles.playerPhoto} />
            <p className={styles.team}>
              <img src={player.statistics[0].team.logo} alt="team photo" className={styles.teamPhoto}/>
              <span>{player.statistics[0].team.name}</span> 
            </p>
            <p>Age: <span>{player.player.age}</span></p>
            <p>Nationality: <span>{player.player.nationality}</span></p>
            <p>Height: <span>{player.player.height}</span></p>
            <p>Weight: <span>{player.player.weight}</span></p>
            <p>Injured: <span>{player.player.injured ? ('Injured') : ('Not injured')}</span></p>
          </div>
        ))
      ) : (
        'no player info found'
      )}
      <div className={styles.statCardsContainer}>
      {playerInfo.length > 0 ? (
        (playerInfo.map( player =>
          (player.statistics.map( statistic => 
            <div key={player.player.id} className={styles.statsCard}>
              <h2>{statistic.league.name}</h2>
              <p>Appearences: <span className={styles.statValue}>{statistic.games.appearences}</span></p>
              <p>Minutes played: <span className={styles.statValue}>{statistic.games.minutes}</span></p>
              <p>Average rating: <span className={styles.statValue}>{statistic.games.rating}</span></p>
              <p>Total shots: <span className={styles.statValue}>{statistic.shots.total}</span></p>
              <p>Shots on target: <span className={styles.statValue}>{statistic.shots.on}</span></p>
              <p>Goals: <span className={styles.statValue}>{statistic.goals.total}</span></p>
              <p>Assists: <span className={styles.statValue}>{statistic.goals.assists}</span></p>
              <p>Dribbles attempted: <span className={styles.statValue}>{statistic.dribbles.attempts}</span></p>
              <p>Dribbles succeeded: <span className={styles.statValue}>{statistic.dribbles.success}</span></p>
              <p>Key Passes: <span className={styles.statValue}>{statistic.passes.key}</span></p>
              <p>Tackles: <span className={styles.statValue}>{statistic.tackles.total}</span></p>
              <p>Fouls Drawn: <span className={styles.statValue}>{statistic.fouls.drawn}</span></p>
              <p>Yellow Cards: <span className={styles.statValue}>{statistic.cards.yellow}</span></p>
              <p>Red Cards: <span className={styles.statValue}>{statistic.cards.red}</span></p>
            </div>
          ))
        ))
      ) : (
        'no player stats found'
      )}
      </div>
    </div>
  )
}

export default PlayerInfo