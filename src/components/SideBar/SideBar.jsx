// styles
import styles from './SideBar.module.css'

const SideBar = (props) => {
  return (
    <div className={styles.sideBar}>
      <h2>{props.profile.name}</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => props.handleButtonClick('changePassword')}>Change Password</button>
        <button onClick={() => props.handleButtonClick('interestForm')}>Change Interested Leagues</button>
        <button onClick={() => props.handleButtonClick('editProfile')}>Edit Profile</button>
        <button onClick={() => props.handleButtonClick('communitiesForm')}>Communities Hub</button>
        <button onClick={() => props.handleButtonClick('profileOverview')}>Profile Overview</button>
      </div>
    </div>
  )
}

export default SideBar