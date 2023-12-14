// npm modules
import { useState, useEffect } from "react";

// service 
import * as leagueService from '../../services/leagueService'
import * as profileService from '../../services/profileService'

// styles
import styles from './InterestForm.module.css'

const InterestForm = (props) => {
  const [usersLeagues, setUsersLeagues] = useState(props.profile.interests)
  const [leagues, setLeagues] = useState()
  const [formData, setFormData] = useState({
    interests: ''
  })

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      setLeagues(data)
      const userLeaguesIds = usersLeagues.map(userLeague => userLeague._id)
      setFormData({interests: userLeaguesIds})
    }
    fetchLeagues()
  }, [usersLeagues])

  const handleCheckboxChange = (leagueId) => {
    setFormData((prevData) => {
      if (prevData.interests.includes(leagueId)) {
        return { interests: prevData.interests.filter((id) => id !== leagueId) }
      } else {
        return { interests: [...prevData.interests, leagueId] }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddInterest(formData)
  }

  const handleAddInterest = async (formData) => {
    await profileService.editInterests(formData)
  }


  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Interest Form</h2>
      <form onSubmit={handleSubmit}>
        {leagues ? <div>
        {leagues.map((league) => (
          <div key={league._id} className={styles.checkboxContainer}>
            <label htmlFor="">{league.leagueName}</label>
            <input
              type="checkbox"
              id={`league-${league._id}`}
              checked={formData.interests.includes(league._id)}
              onChange={() => handleCheckboxChange(league._id)}
              value={league._id}
              className={styles.checkbox}
            />
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>Update Interests</button>
        </div>
        : ' '}
        </form>
    </div>
  )
}

export default InterestForm;