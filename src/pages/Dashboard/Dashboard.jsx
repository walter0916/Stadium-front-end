// npm modules
import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

// services
import * as leagueService from '../../services/leagueService'
import * as profileService from '../../services/profileService'
import * as notificationsService from '../../services/notificationService'
import * as blogsService from '../../services/blogService'

// components
import LeagueCard from '../../components/LeagueCard/LeagueCard'
import SearchBar from '../../components/SearchBar/SearchBar'

// styles
import styles from './Dashboard.module.css'

const Landing = ({ user }) => {
  const profileId = user.profile
  const [leagues, setLeagues] = useState([])
  const [profile, setProfile] = useState([])
  const [blogs, setBlogs] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState([])

  console.log(profileId)
  library.add(fas)

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      const profileData = await profileService.getProfileById()
      setLeagues(data)
      setProfile(profileData)
      const notificationsData = await notificationsService.getUserNotifications(profileId)
      const unreadNotifications = notificationsData.filter(notification => !notification.read);
      setUnreadNotifications(unreadNotifications)
      const blogsData = await blogsService.getAllBlogs()
      setBlogs(blogsData)
    }
    fetchLeagues()
  }, [profileId])


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
      <div className={styles.communitiesNotificationContainer}>

      <div className={styles.joinedCommunities}>
        <h2>Joined Communities</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.communitiesList}>
            {profile.joinedCommunities.map((community) => (
              <li key={community.id}>
                <div className={styles.circle}>
                  <Link to={`/community/${community._id}`}>{community.teamName}</Link>
                </div>
              </li>
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
        <Link to={'/profile'} className={styles.iconWrapper} data-number={unreadNotifications.length}>
        <FontAwesomeIcon icon={['fas', 'bell']} className={styles.bell} />
        </Link>
      </div>
        </div>
      <div className={styles.trendingBlogs}>
        <h1>Trending Blogs</h1>
          <div className={styles.blogCards}>
        {blogs.length ? blogs.map((blog) => (<Link to={`/league/${blog.league._id}/blog/${blog._id}`} key={blog._id} className={styles.blogCard}>
          <img src={blog.photo} alt="" />
          <h2>{blog.title}</h2>
        </Link>)) : ''}
          </div>
      </div>
    </main>
  )
}

export default Landing
