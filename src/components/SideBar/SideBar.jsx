// npm modules
import { Link } from 'react-router-dom';
// pages

// components

// services

// styles
import styles from './SideBar.module.css'

const SideBar = (props) => {
  return (
    <div className={styles.sideBar}>
      <img src={props.profile.photo} alt="" />
      <h2>{props.profile.name}</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => props.handleButtonClick('changePassword')}>Change Password</button>
        <button onClick={() => props.handleButtonClick('interestForm')}>Change Interested Leagues</button>
        <button onClick={() => props.handleButtonClick('editProfile')}>Edit Profile</button>
        {/* <button onClick={() => props.handleButtonClick('notifications')}>See Notifications</button> */}
        <button onClick={() => props.handleButtonClick('communitiesForm')}>Leave Communities</button>
        {/* <button onClick={() => props.handleButtonClick('usersPosts')}>See Posts</button>
        <button onClick={() => props.handleButtonClick('usersBlogs')}>See Blogs</button> */}
        <button onClick={() => props.handleButtonClick('profileOverview')}>Profile Overview</button>
      </div>
    </div>
  )
}

export default SideBar;