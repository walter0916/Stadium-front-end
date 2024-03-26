// npm services
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"

// services
import * as leagueService from '../../services/leagueService'

// styles
import styles from './TeamStatisticsStyles.module.css'

const TeamStatistics = () => {
  const {teamId, leagueId} = useParams()
  const [teamStats, setTeamStats] = useState({})
  const [selectedSeason, setSelectedSeason] = useState(moment().year()-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamStats = async () => {
      const statsData = await leagueService.getTeamStats(leagueId, teamId, selectedSeason)
      const filteredData = statsData.response
      setTeamStats(filteredData)
      setLoading(false)
    }
    fetchTeamStats()
  },[leagueId, teamId, selectedSeason])

  if(loading) {
    return (
      <div className={styles.mainContainer}>
        <h1>loading...</h1>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.teamInfoCard}>
        <h1>{teamStats.team.name}</h1>
        <img src={teamStats.team.logo} alt="" />
        <span className={styles.league}>
          <img src={teamStats.league.logo} alt="" />
          {teamStats.league.name}
        </span>
        <div className={styles.teamForm}>
          <span className={styles.formLabel}>Form: </span>
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
        </div>
      </div>
      <div className={styles.teamStatsContainer}>
        <div className={styles.teamStats}>
          <h2>Goals Scored: </h2>
          <p>
            Home: <span className={styles.stat}>{teamStats.goals.for.total.home} </span>
          </p>
          <p>
            Away: <span className={styles.stat}>{teamStats.goals.for.total.away} </span>
          </p>
          <p>
            total: <span className={styles.stat}>{teamStats.goals.for.total.total} </span>
          </p>
        </div>
        <div className={styles.teamStats}>
          <h2>Average Goals Scored per 90:</h2>
          <p>
            Home: <span className={styles.stat}>{teamStats.goals.for.average.home}</span>
          </p>
          <p>
            Away: <span className={styles.stat}>{teamStats.goals.for.average.away}</span>
          </p>
          <p>
            Total: <span className={styles.stat}>{teamStats.goals.for.average.total}</span>
          </p>
        </div>
        <div className={styles.teamStats}>
          <h2>Goals Conceded:</h2>
          <p>
            Home: <span className={styles.stat}>{teamStats.goals.against.total.home}</span>
          </p>
          <p>
            Away: <span className={styles.stat}>{teamStats.goals.against.total.away}</span>
          </p>
          <p>
            Total: <span className={styles.stat}>{teamStats.goals.against.total.total}</span>
          </p>
        </div>
        <div className={styles.teamStats}>
          <h2>Average Goals Conceded per 90:</h2>
          <p>
            Home: <span className={styles.stat}>{teamStats.goals.against.average.total}</span>
          </p>
          <p>
            Away: <span className={styles.stat}>{teamStats.goals.against.average.away}</span>
          </p>
          <p>
            Total: <span className={styles.stat}>{teamStats.goals.against.average.total}</span>
          </p>
        </div>
        <div className={styles.teamStats}>
          <h2>Clean Sheets: </h2>
          <p>
            Home: <span className={styles.stat}>{teamStats.clean_sheet.home}</span>
          </p>
          <p>
            away: <span className={styles.stat}>{teamStats.clean_sheet.away}</span>
          </p>
          <p>
            Total: <span className={styles.stat}>{teamStats.clean_sheet.total}</span>
          </p>
        </div>
        <div className={styles.teamStats}>
          <h2>Biggest Streaks</h2>
          <p>
            Win Streak: <span className={styles.stat}>{teamStats.biggest.streak.wins}</span>
          </p>
          <p>
            Draw Streak: <span className={styles.stat}>{teamStats.biggest.streak.draws}</span>
          </p>
          <p>
            Loss Streak: <span className={styles.stat}>{teamStats.biggest.streak.loses}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default TeamStatistics