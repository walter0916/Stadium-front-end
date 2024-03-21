// npm services
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"

// services
import * as leagueService from '../../services/leagueService'

// styles
import styles from './TeamStatistics.module.css'

const TeamStatistics = () => {
  const {teamId, leagueId} = useParams()
  const [teamStats, setTeamStats] = useState({})
  const [selectedSeason, setSelectedSeason] = useState(moment().year()-1)

  useEffect(() => {
    const fetchTeamStats = async () => {
      const statsData = await leagueService.getTeamStats(leagueId, teamId, selectedSeason)
      const filteredData = statsData.response
      setTeamStats(filteredData)
    }
    fetchTeamStats()
  },[leagueId, teamId, selectedSeason])

  if (!teamStats || !teamStats.team) {
    return <div >Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
    <div className={styles.teamStatsContainer}>
      <div className={styles.teamInfoCard}>
        <h1>{teamStats.team.name}</h1>
        <img src={teamStats.team.logo} alt="" />
        <span>
          <img src={teamStats.league.logo} alt="" />
          {teamStats.league.name}
        </span>
      </div>
      <div className={styles.teamStats}>
        <p>Form: 
        {teamStats.form.split('').map((letter, index) => (
            <span 
              key={index}
              className={
                letter === 'W' ? styles.win : 
                letter === 'D' ? styles.draw : 
                letter === 'L' ? styles.loss : ''
              }
            >
              {letter}
            </span>
          ))}
        </p>
        <p>
          Goals Scored: <span className={styles.stat}>{teamStats.goals.for.total.total}</span>
        </p>
        <p>
          Average Goals Scored per 90: <span className={styles.stat}>{teamStats.goals.for.average.total}</span>
        </p>
        <p>
          Goals Conceded: <span className={styles.stat}>{teamStats.goals.against.total.total}</span>
        </p>
        <p>
          Average Goals Conceded per 90: <span className={styles.stat}>{teamStats.goals.against.average.total}</span>
        </p>
        <p>
          Clean Sheets: <span className={styles.stat}>{teamStats.clean_sheet.total}</span>
        </p>
        <p>
          Biggest Win Streak: <span className={styles.stat}>{teamStats.biggest.streak.wins}</span>
        </p>
      </div>
    </div>
    </div>
  )
}
export default TeamStatistics