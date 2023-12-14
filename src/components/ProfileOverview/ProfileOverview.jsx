// npm modules
import { useState } from 'react'

// components 
import Notifications from '../Notifications/Notifications'
import UsersBlogs from '../UsersBlogs/UsersBlogs'
import UsersPosts from '../UsersPosts/UsersPosts'

// styles 
import styles from './ProfileOverview.module.css'

const ProfileOverview = (props) => {
  const [activeButton, setActiveButton] = useState('Notifications')
  const [activeComponent, setActiveComponent] = useState('Notifications')

  const handleButtonClick = (button) => {
    setActiveButton(button)
    setActiveComponent(button)
  }


  return (
    <div className={styles.profileContainer}>
      <img src={props.profile.photo} alt="" className={styles.profilePhoto}/>
      <h2 className={styles.profileName}>{props.profile.name}</h2>
      <div className={styles.buttonContainer}>
        <button
          className={`${activeButton === 'Posts' ? styles.activeButton : ''}`}
          onClick={() => handleButtonClick('Posts')}
        >
          Posts
        </button>
        <button
          className={`${activeButton === 'Blogs' ? styles.activeButton : ''}`}
          onClick={() => handleButtonClick('Blogs')}
        >
          Blogs
        </button>
        <button
          className={`${activeButton === 'Notifications' ? styles.activeButton : ''}`}
          onClick={() => handleButtonClick('Notifications')}
        >
          Notifications
        </button>
      </div>
        {activeComponent === 'Posts' && < UsersPosts profile={props.profile}/>}
        {activeComponent === 'Notifications' &&  < Notifications profile={props.profile} />}
        {activeComponent === 'Blogs' &&  < UsersBlogs profile={props.profile}/>}
    </div>
  )
}

export default ProfileOverview