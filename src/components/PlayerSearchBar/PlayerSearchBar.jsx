// npm modules
import { useState } from 'react'

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './PlayerSearchBar.module.css'

const PlayerSearchBar = (props) => {
  const [searchResults, setSearchResults] = useState([])
  const [teamId, setTeamIds] = useState([])
  const [favoriteTeams, setFavoriteTeams] = useState(props.profile.favoriteTeams)
  const [formData, setFormData] = useState({
    playerName: ''
  })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleTeamIdChange = (evt) => {
    setTeamIds(evt.target.value)
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    try {
      const data = await profileService.getPlayerInfoByName(formData, teamId, 2023)
      if (data.response.length === 0) {
        setError('No Player found with that name.')
      } else {
        setSearchResults(data.response)
        setError('')
      }
    } catch (error) {
      setError('An error occurred while fetching Player information.')
    }
  }

  const handleAddToFavorites = async (playerId) => {
    const playerInfo = searchResults.find(result => result.player.id === playerId)
    const playerFormData = {
      playerId: playerInfo.player.id,
      name: playerInfo.player.name,
      nationality: playerInfo.player.nationality,
      age: playerInfo.player.age,
      height: playerInfo.player.height,
      weight: playerInfo.player.weight,
      photo: playerInfo.player.photo,
      teamName: playerInfo.statistics[0].team.name,
      teamLogo: playerInfo.statistics[0].team.logo,
      teamId: playerInfo.statistics[0].team.id,
      position: playerInfo.statistics[0].games.position,
    }
    await profileService.addPlayerToFavorites(playerFormData)
  }


  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <select name="teamId" id="" onChange={handleTeamIdChange}>
          <option value="">select team before searching</option>
          {favoriteTeams.map(favoriteTeam => 
            <option key={favoriteTeam._id} value={favoriteTeam.teamId}>{favoriteTeam.name}</option>  
          )}
        </select>
        <input
          type="text"
          placeholder="Search team by name..."
          name='playerName'
          value={formData.playerName}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.searchDropdown}>
        {searchResults.map((result) => (
          <li key={result.player.id} className={styles.searchResultContainer}>
            <div className={styles.teamInfo}>
              <img className={styles.logo} src={result.player.photo} alt='player photo' />
              {result.player.name}
            </div>
            <button onClick={() => handleAddToFavorites(result.player.id)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayerSearchBar