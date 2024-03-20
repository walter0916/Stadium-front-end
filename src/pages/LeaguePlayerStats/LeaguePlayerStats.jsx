// npm services 
import { useLocation } from "react-router-dom"
import moment from "moment"

// styles
import styles from './LeaguePlayerStats.module.css'

const LeaguePlayerStats = () => {
  const location = useLocation()
  const leagueStatsData = location.state?.leagueStats
  console.log(leagueStatsData[1])

  return (
    <div className={styles.container}>
      <ol className={styles.TopScorersList}>
        <h2>Top Scorers</h2>
        {leagueStatsData[0].map((scorer, index) => (
          <li key={scorer._id} className={styles.PlayerStatsItem}>
            <img src={scorer.player.photo} alt="player photo" className={styles.PlayerPhoto} />
            <div>
              <div className={styles.PlayerName}>{scorer.player.name}</div>
              <div className={styles.PlayerGoals}>{scorer.statistics[0].goals.total}</div>
            </div>
          </li>
        ))}
      </ol>
      <ol className={styles.TopScorersList}>
        <h2>Top Assists</h2>
        {leagueStatsData[1].map((scorer, index) => (
          <li key={scorer._id} className={styles.PlayerStatsItem}>
            <img src={scorer.player.photo} alt="player photo" className={styles.PlayerPhoto} />
            <div>
              <div className={styles.PlayerName}>{scorer.player.name}</div>
              <div className={styles.PlayerGoals}>{scorer.statistics[0].goals.assists}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default LeaguePlayerStats