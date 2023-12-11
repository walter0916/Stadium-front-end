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
        <button >Change Interested Leagues</button>
        <button>Change Profile Photo</button>
        <button onClick={() => props.handleButtonClick('notifications')}>See Notifications</button>
        <button>Leave Communities</button>
        <button>See Posts</button>
        <button>See Blogs</button>
      </div>
    </div>
  )
}

export default SideBar;