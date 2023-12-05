import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import * as leagueService from '../../services/leagueService';
import * as profileService from '../../services/profileService';
import * as notificationsService from '../../services/notificationService'
import SearchBar from '../../components/SearchBar/SearchBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Landing = ({ user }) => {
  const profileId = user.profile
  const [leagues, setLeagues] = useState([])
  const [profile, setProfile] = useState([])
  const [notifications, setNotifications] = useState([])

  console.log(profileId)
  library.add(fas)

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      const profileData = await profileService.getProfileById()
      setLeagues(data)
      setProfile(profileData)
      const notificationsdata = await notificationsService.getAllNotifications()
      console.log(notificationsdata)
      const filteredNotifcationData = await notificationsdata.filter(notification => notification.targetUser === profileId)
      setNotifications(filteredNotifcationData)
    }
    fetchLeagues()
  }, [profileId])


  console.log(notifications)

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>{user ? `${user.name}'s` : "Friend's"} Dashboard</h1>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
      <div className={styles.interests}>
        {profile.interests ? (
          profile.interests.map((interest) => (
            <LeagueCard key={interest.id} interest={interest} />
          ))
        ) : (
          <p>No interests available</p>
        )}
      </div>
      {/* <div className={styles.secondContainer}> */}
      <div className={styles.communitiesNotificationContainer}>

      <div className={styles.joinedCommunities}>
        <h2>Joined Communities</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.communitiesList}>
            {profile.joinedCommunities.map((community) => (
              <li key={community.id}><Link to={`/community/${community._id}`}>{community.teamName}</Link></li>
              ))}
          </ul>
        ) : (
          <p>No communities joined</p>
          )}
      </div>
      <div className={styles.blogFormLink}>
        <Link to={'/blog/new'}>Create A Blog</Link>
      </div>
      <div className={styles.notifications}>
        <h2>Notifications</h2>
        <div className={styles.iconWrapper} data-number={notifications.length}>
        <FontAwesomeIcon icon={['fas', 'bell']} className={styles.bell} />
        </div>
      </div>
        </div>
    {/* </div> */}
      <div className={styles.trendingBlogs}>
        <h2>Trending Blogs</h2>
          <div className={styles.blogCards}>

        <div className={styles.blogCard}>
          <p>Blog Title</p>
          <p>Author: John Doe</p>
          <p>Likes: 50</p>
          <p>Comments: 30</p>
        </div>
        <div className={styles.blogCard}>
          <p>Blog Title</p>
          <p>Author: John Doe</p>
          <p>Likes: 50</p>
          <p>Comments: 30</p>
        </div>
        <div className={styles.blogCard}>
          <p>Blog Title</p>
          <p>Author: John Doe</p>
          <p>Likes: 50</p>
          <p>Comments: 30</p>
        </div>
        <div className={styles.blogCard}>
          <p>Blog Title</p>
          <p>Author: John Doe</p>
          <p>Likes: 50</p>
          <p>Comments: 30</p>
        </div>
          </div>
      </div>
    </main>
  )
}

export default Landing
