// npm modules 
import { useLocation } from "react-router-dom"

// styles 
import styles from './Standings.module.css'

const Standings = () => {
  const location = useLocation()
  const standingsData = location.state?.standings
  const flattenedStandings = standingsData.flat()

  console.log(flattenedStandings)

  return (
    <div className={styles.standingsContainer}>
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Team Name</th>
            <th className={styles.headerCell}>Wins</th>
            <th className={styles.headerCell}>Draws</th>
            <th className={styles.headerCell}>Losses</th>
            <th className={styles.headerCell}>Goals Scored</th>
            <th className={styles.headerCell}>Goals Against</th>
            <th className={styles.headerCell}>Goal Differential</th>
          </tr>
        </thead>
        <tbody>
          {flattenedStandings.map((standing, index) => (
            <tr key={index}>
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

export default Standings
