// npm modules
import { useState, useEffect } from "react"

// pages

// components
import SideBar from "../../components/SideBar/SideBar"
import ChangePassword from "../../components/ChangePassword/ChangePassword"
import Notifications from "../../components/Notifications/Notifications"
import UsersPosts from "../../components/UsersPosts/UsersPosts"
import UsersBlogs from "../../components/UsersBlogs/UsersBlogs"
import InterestForm from "../../components/InterestForm/InterestForm"
import LeaveCommunitiesForm from "../../components/LeaveCommunitiesForm/LeaveCommunitiesForm"
import ProfileOverview from "../../components/ProfileOverview/ProfileOverview"

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profile.module.css'

const Profile = (props) => {
  const [profile, setProfile] = useState({})
  const [activeComponent, setActiveComponent] = useState('profileOverview')

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
      <div className={styles.componentContainer}>
        {activeComponent === 'changePassword' && <ChangePassword />}
        {activeComponent === 'notifications' && <Notifications profile={profile}/>}
        {activeComponent === 'usersPosts' && <UsersPosts />}
        {activeComponent === 'usersBlogs' && <UsersBlogs />}
        {activeComponent === 'interestForm' && <InterestForm />}
        {activeComponent === 'communitiesForm' && <LeaveCommunitiesForm />}
        {activeComponent === 'profileOverview' && <ProfileOverview profile={profile}/>}
      </div>
    </div>
  )
}

export default Profile;