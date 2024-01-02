// npm modules
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from'./NavBar.module.css'

// services
import * as profileService from '../../services/profileService'

const NavBar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [ profile, setProfile] = useState({})
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const data = await profileService.getProfileById(user.profile)
        setProfile(data)
      }
    }
    fetchProfile()
  }, [user])


  return (
    <nav className={styles.navContainer}>
      {user ? (
        <div className={styles.loggedInContainer}>
          <div className={styles.homeLink}>
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </div>
          <div className={styles.userProfile} onClick={toggleDropdown}>
            <p>Welcome, {user.name}</p>
            <img src={profile.photo} alt="User Profile" />
          </div>
          {dropdownOpen && (
            <ul className={styles.dropdown}>
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
