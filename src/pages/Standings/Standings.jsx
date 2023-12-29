// npm modules 
import { useLocation } from "react-router-dom"

const Standings = () => {
  const location = useLocation()
  const standingsData = location.state?.standings
  const flattenedStandings = standingsData.flat()

  console.log(flattenedStandings)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Goals Scored</th>
            <th>Goals Against</th>
            <th>Goal Differential</th>
          </tr>
        </thead>
        <tbody>
          {flattenedStandings.map((standing, index) => (
            <tr key={index}>
              <td>{standing.team.name}</td>
              <td>{standing.all.win}</td>
              <td>{standing.all.draw}</td>
              <td>{standing.all.lose}</td>
              <td>{standing.all.goals.for}</td>
              <td>{standing.all.goals.against}</td>
              <td>{standing.goalsDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Standings
