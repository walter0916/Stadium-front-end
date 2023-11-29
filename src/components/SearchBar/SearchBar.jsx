import { useState, useEffect } from 'react'
import * as communityService from '../../services/communityService'
import { Link } from 'react-router-dom'

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
  const handleJoinCommunity = (communityId) => {
    console.log(`Joining community with ID: ${communityId}`)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search communities..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>
            <Link to={`/community/${result._id}`}>{result.teamName}</Link>
            <button onClick={() => handleJoinCommunity(result.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar

