// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// services
import * as communityService from '../../services/communityService'

// styles
import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    const fetchCommunities = async () => {
      const data = await communityService.getAllCommunities()
      setCommunities(data)
    }
    fetchCommunities()
  }, [])


  const handleSearchChange = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    if (query === '') {
      setSearchResults([])
      return
    }
    const filteredCommunities = communities.filter((community) =>
      community.teamName.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filteredCommunities)
  }
  const handleJoinCommunity = async (communityId) => {
    await communityService.joinCommunity(communityId)
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search communities..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul className={styles.searchDropdown}>
        {searchResults.map((result) => (
          <li key={result._id}>
            <Link to={`/community/${result._id}`}>{result.teamName}</Link>
            <button onClick={() => handleJoinCommunity(result._id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar

