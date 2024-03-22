// npm services 
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"

// services
import * as communityService from '../../services/communityService'

// styles
import styles from './TeamFixtures.module.css'

const TeamFixtures = () => {
  const {teamId} = useParams()
  console.log(teamId)
  const [fixtures, setFixtures] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(moment().year()-1)

  useEffect(() => {
    const fetchFixtures = async () => {
      const fixturesData = await communityService.getTeamFixtures(teamId, selectedSeason)
      const sortedFixtures = fixturesData.response.sort((a, b) =>
      moment(a.fixture.date).diff(moment(b.fixture.date))
      )
      setFixtures(sortedFixtures)
    }
    fetchFixtures()
  },[teamId, selectedSeason])

  const formatDate = (date) => moment(date).format("MMMM Do YYYY")

  const scrollToNearestFixtures = () => {
    const nearestFixture = fixtures.find(
      (fixture) => moment(fixture.fixture.date).isSameOrAfter(moment(), "day")
    )
    if (nearestFixture) {
      const fixtureIndex = fixtures.indexOf(nearestFixture)
      const fixtureElement = document.getElementById(`fixture_${fixtureIndex}`)
      if (fixtureElement) {
        fixtureElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    scrollToNearestFixtures()
  }, [fixtures])

  const handleSeasonChange = async (e) => {
    const selectedYear = parseInt(e.target.value)
    setSelectedSeason(selectedYear)
  }

  if (fixtures.length === 0) {
    return (
    <div className={styles.mainContainer}>
      <select value={selectedSeason} onChange={handleSeasonChange}>
        {Array.from({ length: moment().year() - 2000 + 1 }, (_, index) => (
          <option key={index} value={moment().year() - index}>
            {moment().year() - index}
          </option>
        ))}
      </select>
      <h2>no fixtures found</h2>
    </div>
    )
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
      <div className={styles.fixturesContainer}>
        {fixtures.map((fixture, index) => (
          <div 
            key={fixture.fixture.id}
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
    </div>
  )
}

export default TeamFixtures