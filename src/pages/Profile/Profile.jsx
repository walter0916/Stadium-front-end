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
import CommunitiesHub from "../../components/CommuntiesHub/CommunitiesHub"
import ProfileOverview from "../../components/ProfileOverview/ProfileOverview"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"

// services
import * as profileService from '../../services/profileService'

// styles
import styles from './Profile.module.css'
import LeagueSearchBar from "../../components/LeagueSearchBar/LeagueSearchBar"

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
        {activeComponent === 'interestForm' && <LeagueSearchBar profile={profile}/>}
        {activeComponent === 'communitiesForm' && <CommunitiesHub profile={profile}/>}
        {activeComponent === 'profileOverview' && <ProfileOverview profile={profile}/>}
        {activeComponent === 'editProfile' && <EditProfileForm profile={profile}/>}
      </div>
    </div>
  )
}

export default Profile