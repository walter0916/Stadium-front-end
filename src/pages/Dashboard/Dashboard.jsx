// css
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import LeagueCard from '../../components/LeagueCard/LeagueCard'
import * as leagueService from '../../services/leagueService'
import * as profileService from '../../services/profileService'



const Landing = ({ user }) => {
  const [leagues, setLeagues] = useState([])
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      const profileData = await profileService.getProfileById()
      setLeagues(data)
      setProfile(profileData)
    }
    fetchLeagues()
  }, [])

  console.log(leagues)
  console.log(profile)

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <h2>hi</h2>
      <div className={styles.interests}>
      {profile.interests ? (
        profile.interests.map(interest => <LeagueCard interest={interest}/>)
        ) : (
        <p>No interests available</p>
      )}
      </div>
    </main>
  )
}

export default Landing