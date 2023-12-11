// npm modules
import { useState, useEffect } from "react"

// pages

// components
import SideBar from "../../components/SideBar/SideBar"
import ChangePassword from "../../components/ChangePassword/ChangePassword"
import Notifications from "../../components/Notifications/Notifications"
// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profile.module.css'

const Profile = (props) => {
  const [profile, setProfile] = useState({})
  const [activeComponent, setActiveComponent] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfileById(props.user.profile)
      setProfile(data)
    }
    fetchProfile()
  }, [props.user.profile])

  const handleButtonClick = (component) => {
    setActiveComponent(component)
  }

  return (
    <div className={styles.profileContainer}>
      <SideBar profile={profile} handleButtonClick={handleButtonClick}/>
      <div>
        {activeComponent === 'changePassword' && <ChangePassword />}
        {activeComponent === 'notifications' && <Notifications />}
      </div>
    </div>
  )
}

export default Profile;