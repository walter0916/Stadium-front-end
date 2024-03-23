// npm services 
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"

// styles
import styles from './LeaguePlayerStats.module.css'

// services
import * as leagueService from '../../services/leagueService'

const LeaguePlayerStats = () => {
  const location = useLocation()
  const leagueId = location.state?.league.leagueId
  const [leagueStats, setLeagueStats] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(moment().year()-1)

  useEffect(() => {
    const fetchLeaguePlayerStats = async () => {
      const statsData = await leagueService.getLeagueStats(leagueId, selectedSeason)
      const filteredData = statsData
      setLeagueStats(filteredData)
    }
    fetchLeaguePlayerStats()
  },[leagueId, selectedSeason])

  
  const handleSeasonChange = async (e) => {
    const selectedYear = parseInt(e.target.value)
    setSelectedSeason(selectedYear)
  }
  if (leagueStats.length === 0) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <select value={selectedSeason} onChange={handleSeasonChange}>
        {Array.from({ length: moment().year() - 2000 + 1 }, (_, index) => (
          <option key={index} value={moment().year() - index}>
            {moment().year() - index}
          </option>
        ))}
      </select>
      <div className={styles.statsContainer}>
        <ol className={styles.TopScorersList}>
          <div className={styles.header}>
            <h2>Top Scorers</h2>
          </div>
          {leagueStats[0].length === 0 ? (
            <p>No top scorers found</p>
          ) : (
            leagueStats[0].map((scorer, index) => (
              <li key={scorer.player.id} className={styles.PlayerStatsItem}>
                <img src={scorer.player.photo} alt="player photo" className={styles.PlayerPhoto} />
                <div>
                  <div className={styles.PlayerName}>{scorer.player.name}</div>
                  <div className={styles.PlayerGoals}>{scorer.statistics[0].goals.total}</div>
                </div>
              </li>
            ))
          )}
        </ol>
        <ol className={styles.TopScorersList}>
          <div className={styles.header}>
            <h2>Top Assists</h2>
          </div>
          {leagueStats[1].length === 0 ? (
            <p>No top assisters found</p>
          ) : (
            leagueStats[1].map((scorer, index) => (
              <li key={scorer.player.id} className={styles.PlayerStatsItem}>
                <img src={scorer.player.photo} alt="player photo" className={styles.PlayerPhoto} />
                <div>
                  <div className={styles.PlayerName}>{scorer.player.name}</div>
                  <div className={styles.PlayerGoals}>{scorer.statistics[0].goals.assists}</div>
                </div>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  )
}

export default LeaguePlayerStats