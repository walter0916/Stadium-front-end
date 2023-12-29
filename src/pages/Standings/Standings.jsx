// npm modules
import { useLocation } from 'react-router-dom'

// styles 
import styles from './Standings.module.css'

const Standings = () => {
  const location = useLocation()
  const standingsData = location.state?.standings
  const flattenedStandings = standingsData.flat()

  if (flattenedStandings.length <= 30) {
    return (
      <div className={styles.standingsContainer}>
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
            {flattenedStandings.map((standing) => (
              <tr key={standing.team.id} className={styles.standingRow}>
                <td className={styles.cell}>{standing.team.name}</td>
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
    )
  }

  const standingsByGroup = flattenedStandings.reduce((acc, standing) => {
    const groupName = standing.group || 'Other'
    acc[groupName] = acc[groupName] || []
    acc[groupName].push(standing)
    return acc
  }, {})

  return (
    <div>
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
                  <td className={styles.cell}>{standing.team.name}</td>
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