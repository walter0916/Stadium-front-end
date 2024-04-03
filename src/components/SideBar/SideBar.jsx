import { useState, useEffect } from 'react'
import styles from './SideBar.module.css'

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isToggleable, setIsToggleable] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsToggleable(window.innerHeight < 1180)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.show : styles.hidden}`}>
      {isToggleable && (
        <div className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? 'Hide' : '|||'}
        </div>
      )}
      <h2>{props.profile.name}</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => {props.handleButtonClick('changePassword'); closeSidebar()}}>Change Password</button>
        <button onClick={() => {props.handleButtonClick('interestForm'); closeSidebar()}}>Add Favorite Leagues</button>
        <button onClick={() => {props.handleButtonClick('playerForm'); closeSidebar()}}>Add Favorite players</button>
        <button onClick={() => {props.handleButtonClick('teamForm'); closeSidebar()}}>Add Favorite Teams</button>
        <button onClick={() => {props.handleButtonClick('editProfile'); closeSidebar()}}>Edit Profile</button>
        <button onClick={() => {props.handleButtonClick('communitiesForm'); closeSidebar()}}>Communities Hub</button>
        <button onClick={() => {props.handleButtonClick('profileOverview'); closeSidebar()}}>Profile Overview</button>
      </div>
    </div>
  )
}

export default SideBar

