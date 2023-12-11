// npm modules
import { useState, useEffect } from "react"

// pages

// components

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profile.module.css'

const Profile = (props) => {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfileById(props.user.profile)
      setProfile(data)
    }
    fetchProfile()
  }, [props.user.profile])

  console.log(profile)

  return (
    <div className={styles.profileContainer}>
      
    </div>
  )
}

export default Profile;