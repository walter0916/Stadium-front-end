// npm modules
import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from'./NavBar.module.css'

// services
import * as profileService from '../../services/profileService'
import * as notificationService from '../../services/notificationService'

const NavBar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [ profile, setProfile] = useState({})
  const [unreadNotifications, setUnreadNotifications] = useState([])
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const dropdownRef = useRef(null)
  library.add(fas)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const data = await profileService.getProfileById(user.profile)
        const notificationsData = await notificationService.getUserNotifications(user.profile)
      const unreadNotifications = notificationsData.filter(notification => !notification.read)
      setUnreadNotifications(unreadNotifications)
        setProfile(data)
      }
    }
    fetchProfile()
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false) 
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])


  return (
    <nav className={styles.navContainer}>
      {user ? (
        <div className={styles.loggedInContainer}>
          <div className={styles.linksContainer}>
            <NavLink to="/" className={styles.homeLink}>
              <FontAwesomeIcon icon={faHome} className={styles.homeIcon} />
            </NavLink>
            
          </div>
          <NavLink to={'/profile'} className={styles.iconWrapper} data-number={unreadNotifications.length}>
            <FontAwesomeIcon icon={['fas', 'bell']} className={styles.bell} />
          </NavLink>
          <div className={styles.userProfile} onClick={toggleDropdown} ref={dropdownRef}>
            <img src={profile.photo} alt="User Profile" />
          </div>
          {dropdownOpen && (
            <ul className={`${styles.dropdown} ${dropdownOpen ? styles.open : ''}`} ref={dropdownRef} >
              <li><NavLink to="/profile">My Profile</NavLink></li>
              <li onClick={handleLogout}>Log Out</li>
            </ul>
          )}
        </div>
      ) : (
        <ul className={styles.links}>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
