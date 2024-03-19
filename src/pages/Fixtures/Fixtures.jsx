// npm services 
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import moment from "moment"

// styles
import styles from './Fixtures.module.css'

const Fixtures = () => {
  const location = useLocation()
  const fixturesData = location.state?.fixtures

  const sortedFixtures = fixturesData.sort((a, b) =>
  moment(a.fixture.date).diff(moment(b.fixture.date))
  )

  const formatDate = (date) => moment(date).format("MMMM Do YYYY")

  const scrollToNearestFixtures = () => {
    const nearestFixture = sortedFixtures.find(
      (fixture) => moment(fixture.fixture.date).isSameOrAfter(moment(), "day")
    )
    if (nearestFixture) {
      const fixtureIndex = sortedFixtures.indexOf(nearestFixture)
      const fixtureElement = document.getElementById(`fixture_${fixtureIndex}`)
      if (fixtureElement) {
        fixtureElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }


  useEffect(() => {
    scrollToNearestFixtures()
  }, [])


  return (
    <div className={styles.fixturesContainer}>
      {sortedFixtures.map((fixture, index) => (
        <div 
          key={fixture._id}
          id={`fixture_${index}`}
          className={styles.fixtureCard}
        >
          <p className={styles.fixtureDate}> {formatDate(fixture.fixture.date)}</p>
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
      ))}
    </div>
  )
}

export default Fixtures