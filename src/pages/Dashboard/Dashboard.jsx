// npm modules
import { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

// services
import * as profileService from '../../services/profileService'
import * as notificationsService from '../../services/notificationService'
import * as blogsService from '../../services/blogService'

// components
import LeagueCard from '../../components/LeagueCard/LeagueCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import FavoriteTeamsFixtures from '../../components/FavoriteTeamsFixtures/FavoriteTeamsFixtures'

// styles
import styles from './Dashboard.module.css'

const Dashboard = ({ user }) => {
  const profileId = user.profile
  const [profile, setProfile] = useState([])
  const [blogs, setBlogs] = useState([])
  const [teamIds, setTeamIds] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState([])
  library.add(fas)

  useEffect(() => {
    const fetchLeagues = async () => {
      const profileData = await profileService.getProfileById(profileId)
      setProfile(profileData)
      const favoriteTeamData = profileData.favoriteTeams.map(team => team.teamId )
      setTeamIds(favoriteTeamData)
      const notificationsData = await notificationsService.getUserNotifications(profileId)
      const unreadNotifications = notificationsData.filter(notification => !notification.read)
      setUnreadNotifications(unreadNotifications)
      const blogsData = await blogsService.getAllBlogs()
      blogsData.sort((a, b) => b.likes - a.likes || new Date(b.createdAt) - new Date(a.createdAt))
      const topTrendingBlogs = blogsData.slice(0, 4)
      setBlogs(topTrendingBlogs)
    }
    fetchLeagues()
  }, [profileId])


  return (
    <main className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Stadium</h1>
      </div>
      <div className={styles.leagueLinksContainer}>
        <h1>Links To League Page</h1>
      <div className={styles.interests}>
        {profile.interests ? (
          profile.interests.map((interest) => (
            <LeagueCard key={interest._id} interest={interest} />           
            ))
            ) : (
              <p>No interests available</p>
              )}
      </div>
      </div>
      <div className={styles.mainContainer}>
      <div className={styles.upcomingFixturesContainer}>
      {/* <div className={styles.blogFormLink}>
        <h1>Create a blog</h1>
        <Link to={'/blog/new'}><FontAwesomeIcon icon={faPencilAlt} className={`${styles.pencil} fa-3x`} /></Link>
      </div>
      <div className={styles.notifications}>
        <h1>Notifications</h1>
        <Link to={'/profile'} className={styles.iconWrapper} data-number={unreadNotifications.length}>
        <FontAwesomeIcon icon={['fas', 'bell']} className={styles.bell} />
        </Link>
      </div> */}
      <h2>Upcoming Fixtures</h2>
      <FavoriteTeamsFixtures 
        teamIds={teamIds} 
        user={user}
      />
      </div>
      <div className={styles.communityContainer}>
      <div className={styles.joinedCommunities}>
        <h2>Joined Communities</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.communitiesList}>
            {profile.joinedCommunities.map((community) => (
              <li key={community._id}>
                <div className={styles.circle}>
                  <Link to={`/community/${community._id}`}><img src={community.logo} alt={community.teamName} /></Link>
                </div>
              </li>
              ))}
          </ul>
        ) : (
          <p>No communities joined</p>
          )}
      </div>
      <div className={styles.searchBarContainer}>
        <SearchBar user={user} />
      </div>
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

export default Dashboard
