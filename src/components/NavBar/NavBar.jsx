// npm modules
import { NavLink } from 'react-router-dom'
import styles from'./NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul className={styles.links}>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/profile">My Profile</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
