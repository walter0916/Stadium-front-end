// npm modules
import { useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([])
  const [formData, setFormData] = useState({
    teamName: ''
  })
  const [error, setError] = useState('')
  const [teamInfo, setTeamInfo] = useState(null)

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

  const handleAddToFavorites = (teamId) => {

  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search team by name..."
          name='teamName'
          value={formData.teamName}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
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
  )
}

export default SearchBar


