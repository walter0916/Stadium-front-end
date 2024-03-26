import { useState, useEffect } from 'react'
import styles from './SideBar.module.css'

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isToggleable, setIsToggleable] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsToggleable(window.innerHeight < 950)
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

  return (
    <div className={`${styles.sideBar} ${isOpen ? styles.show : styles.hidden}`}>
      {isToggleable && (
        <div className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? 'Hide' : '|||'}
        </div>
      )}
      <h2>{props.profile.name}</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => props.handleButtonClick('changePassword')}>Change Password</button>
        <button onClick={() => props.handleButtonClick('interestForm')}>Add Favorite Leagues</button>
        <button onClick={() => props.handleButtonClick('playerForm')}>Add Favorite players</button>
        <button onClick={() => props.handleButtonClick('teamForm')}>Add Favorite Teams</button>
        <button onClick={() => props.handleButtonClick('editProfile')}>Edit Profile</button>
        <button onClick={() => props.handleButtonClick('communitiesForm')}>Communities Hub</button>
        <button onClick={() => props.handleButtonClick('profileOverview')}>Profile Overview</button>
      </div>
    </div>
  )
}

export default SideBar

