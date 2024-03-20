// npm services
import { useEffect, useState } from "react"
import moment from "moment"
import 'moment-timezone'

// service 
import * as profileService from '../../services/profileService'

// styles 
import styles from './FavoriteTeamsFixtures.module.css'

const FavoriteTeamsFixtures = (props) => {
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    const fetchUpcomingFixtures = async () => {
      const newFixtures = []
      for ( const teamId of props.teamIds) {
        const fixturesData = await profileService.getUpcomingFixture(teamId)
        newFixtures.push(fixturesData.response)
      }
      setFixtures(newFixtures)
    }
    fetchUpcomingFixtures()
  }, [props.teamIds])

  const formatDate = (date) => {
    const utcDate = moment.utc(date)
    const etDate = utcDate.clone().tz('America/New_York')
    return etDate.format("MMMM Do, h:mm A [ET]")
  }

  return (
    <div className={styles.fixturesContainer}>
      {fixtures.length > 0 ? (
        fixtures.map(innerArray => (
          innerArray.map(fixture => (
            <div key={fixture.teams.away.id} className={styles.fixtureCard}>
              <p className={styles.fixtureDate}>{formatDate(fixture.fixture.date)}</p>
              <div className={styles.teamContainer}>
                <div className={styles.awayTeam}>
                  <span className={styles.awayTeamName}>{fixture.teams.away.name}</span>
                  <img src={fixture.teams.away.logo} alt={fixture.teams.away.name} className={styles.teamLogo} />
                </div>
                <div className={styles.scoreContainer}>
                  <span className={styles.teamScore}>{fixture.score.fulltime.away}</span>
                  <span className={styles.scoreSeparator}>-</span>
                  <span className={styles.teamScore}>{fixture.score.fulltime.home}</span>
                </div>
                <div className={styles.homeTeam}>
                  <img src={fixture.teams.home.logo} alt={fixture.teams.home.name} className={styles.teamLogo} />
                  <span className={styles.homeTeamName}>{fixture.teams.home.name}</span>
                </div>
              </div>
            </div>
          ))
        ))
      ) : (
        <p>No fixtures available</p>
      )}
    </div>
  )
}

export default FavoriteTeamsFixtures