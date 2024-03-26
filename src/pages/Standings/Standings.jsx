// npm modules
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

// styles 
import styles from './Standings.module.css'

// services
import * as leagueService from '../../services/leagueService'

const Standings = () => {
  const location = useLocation()
  const leagueId = location.state?.league.leagueId
  const [standings, setStandings] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(moment().year()-1)

  useEffect(() => {
    const fetchStandings = async () => {
      const standingsData = await leagueService.getStandings(leagueId, selectedSeason)
      const filteredData = standingsData.response[0].league.standings
      const flattenedStandings = filteredData.flat()
      setStandings(flattenedStandings)
    }
    fetchStandings()
  },[leagueId, selectedSeason])

  const handleSeasonChange = async (e) => {
    const selectedYear = parseInt(e.target.value)
    setSelectedSeason(selectedYear)
  }

  if (standings.length <= 30) {
    return (
      <div className={styles.mainContainer}>
        <select value={selectedSeason} onChange={handleSeasonChange} className={styles.yearSelect}>
          {Array.from({ length: moment().year() - 2000 + 1 }, (_, index) => (
            <option key={index} value={moment().year() - index}>
              {moment().year() - index}
            </option>
          ))}
        </select>
        <div className={styles.standingsContainer}>
          <table className={styles.standingsTable}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Team</th>
                <th className={styles.headerCell}>W</th>
                <th className={styles.headerCell}>D</th>
                <th className={styles.headerCell}>L</th>
                <th className={styles.headerCell}>GS</th>
                <th className={styles.headerCell}>GA</th>
                <th className={styles.headerCell}>GD</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index) => (
                <tr key={standing.team.id} className={styles.standingRow}>
                  <td className={styles.teamCell}>
                    <div className={styles.teamContainer}>
                      {index + 1}.
                      <img src={standing.team.logo} className={styles.logo} alt='team logo' />
                      <Link to={`/league/${leagueId}/${standing.team.id}/statistics`} className={styles.link}>
                        {standing.team.name}
                      </Link>
                    </div>
                  </td>
                  <td className={styles.cell}>{standing.all.win}</td>
                  <td className={styles.cell}>{standing.all.draw}</td>
                  <td className={styles.cell}>{standing.all.lose}</td>
                  <td className={styles.cell}>{standing.all.goals.for}</td>
                  <td className={styles.cell}>{standing.all.goals.against}</td>
                  <td className={styles.cell}>{standing.goalsDiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const standingsByGroup = standings.reduce((acc, standing) => {
    const groupName = standing.group || 'Other'
    acc[groupName] = acc[groupName] || []
    acc[groupName].push(standing)
    return acc
  }, {})

  return (
    <div>
      <select value={selectedSeason} onChange={handleSeasonChange}>
        {Array.from({ length: moment().year() - 2000 + 1 }, (_, index) => (
          <option key={index} value={moment().year() - index}>
            {moment().year() - index}
          </option>
        ))}
      </select>
      {Object.entries(standingsByGroup).map(([groupName, groupStandings]) => (
        <div key={groupName} className={styles.standingsContainer}>
          <h2>{groupName}</h2>
          <table className={styles.standingsTable}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Team</th>
                <th className={styles.headerCell}>Wins</th>
                <th className={styles.headerCell}>Draws</th>
                <th className={styles.headerCell}>Losses</th>
                <th className={styles.headerCell}>Goals Scored</th>
                <th className={styles.headerCell}>Goals Allowed</th>
                <th className={styles.headerCell}>Goal Differential</th>
              </tr>
            </thead>
            <tbody>
              {groupStandings.map((standing) => (
                <tr key={standing.team.id} className={styles.standingRow}>
                  <td className={styles.cell}>
                    <div className={styles.teamLogo}>
                      <img src={standing.team.logo} className={styles.logo} alt='Team logo' />
                    </div>
                    <span>{standing.team.name}</span>
                  </td>
                  <td className={styles.cell}>{standing.all.win}</td>
                  <td className={styles.cell}>{standing.all.draw}</td>
                  <td className={styles.cell}>{standing.all.lose}</td>
                  <td className={styles.cell}>{standing.all.goals.for}</td>
                  <td className={styles.cell}>{standing.all.goals.against}</td>
                  <td className={styles.cell}>{standing.goalsDiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Standings