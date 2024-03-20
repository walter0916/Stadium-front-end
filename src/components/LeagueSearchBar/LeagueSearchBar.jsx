// npm modules
import { useState } from 'react'

// services
import * as leagueService from '../../services/leagueService'
import * as profileService from '../../services/profileService'

// styles
import styles from './leagueSearchBar.module.css'

const LeagueSearchBar = () => {
  const [searchResults, setSearchResults] = useState([])
  const [formData, setFormData] = useState({ leagueName: ''})
  const [error, setError] = useState('')
  const [leagueInfo, setLeagueInfo] = useState(null)

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    try {
      const data = await leagueService.getLeagueInfo(formData)
      if (data.response.length === 0) {
        setError('No team found with that name.')
      } else {
        setSearchResults(data.response)
        setError('')
      }
    } catch (error) {
      setError('An error occurred while fetching team information.')
    }
  }

  const handleAddToFavorites = async (leagueId) => {
    const leagueInfo = searchResults.find(result => result.league.id === leagueId)
    const leagueFormData = {
      leagueId: leagueInfo.league.id,
      name: leagueInfo.league.name,
      logo: leagueInfo.league.logo,
      country: leagueInfo.country.name,
    }
    await profileService.addLeagueToInterests(leagueFormData)
  }

  return (
    <div className={styles.searchContainer}>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search league by name..."
        name='leagueName'
        value={formData.leagueName}
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
    {error && <p className={styles.error}>{error}</p>}
    <ul className={styles.searchDropdown}>
      {searchResults.map((result) => (
        <li key={result.league.id} className={styles.searchResultContainer}>
          <div className={styles.teamInfo}>
            <img className={styles.logo} src={result.league.logo} alt={result.league.name} />
            {result.league.name}
          </div>
          <button onClick={() => handleAddToFavorites(result.league.id)}>Add to Favorites</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default LeagueSearchBar