// npm modules
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './TeamSearchBar.module.css'

const TeamSearchBar = () => {
  const [searchResults, setSearchResults] = useState([])
  const [formData, setFormData] = useState({
    teamName: ''
  })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    try {
      const data = await profileService.getTeamInfo(formData)
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

  const handleAddToFavorites = async (teamId) => {
    const teamInfo = searchResults.find(result => result.team.id === teamId)
    const teamFormData = {
      teamId: teamInfo.team.id,
      name: teamInfo.team.name,
      logo: teamInfo.team.logo,
      country: teamInfo.team.country,
      founded: teamInfo.team.founded,
      venueName: teamInfo.venue.name,
      venueCity: teamInfo.venue.city,
      venueCapacity: teamInfo.venue.capacity,
      venueImage: teamInfo.venue.image,
    }
    await profileService.addTeamToFavorites(teamFormData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search team by name..."
            name='teamName'
            value={formData.teamName}
            onChange={handleChange}
            className={styles.searchTerm}
          />
          <button type="submit" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon}/>
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.searchDropdown}>
          {searchResults.map((result) => (
            <li key={result.team.id} className={styles.searchResultContainer}>
              <div className={styles.teamInfo}>
                <img className={styles.logo} src={result.team.logo} alt={result.team.name} />
                {result.team.name}
              </div>
              <button onClick={() => handleAddToFavorites(result.team.id)}>Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TeamSearchBar


