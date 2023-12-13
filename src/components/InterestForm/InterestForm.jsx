// npm modules
import { useState, useEffect } from "react";

// service 
import * as leagueService from '../../services/leagueService'

// styles 

const InterestForm = (props) => {
  const [usersLeagues, setUsersLeagues] = useState(props.profile.interests)
  const [leagues, setLeagues] = useState()
  const [formData, setFormData] = useState([])

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      setLeagues(data)
      setFormData(usersLeagues.map(userLeague => userLeague._id))
    }
    fetchLeagues()
  }, [usersLeagues])

  const handleCheckboxChange = (leagueId) => {
    if (formData.includes(leagueId)) {
      setFormData(formData.filter(id => id !== leagueId))
    } else {
      setFormData([...formData, leagueId])
    }
  }


  return (
    <div>
      <h2>Interest Form</h2>
      <form >
        {leagues ? <div>
        {leagues.map((league) => (
          <div key={league._id}>
            <label htmlFor="">{league.leagueName}</label>
            <input
              type="checkbox"
              id={`league-${league._id}`}
              checked={formData.includes(league._id)}
              onChange={() => handleCheckboxChange(league._id)}
              value={league._id}
            />
          </div>
        ))}
        <button type="submit">Update Interests</button>
        </div>
        : ' '}
        </form>
    </div>
  )
}

export default InterestForm;