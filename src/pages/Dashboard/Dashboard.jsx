// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'
import * as blogsService from '../../services/blogService'

// components
import LeagueCard from '../../components/LeagueCard/LeagueCard'
import FavoriteTeamsFixtures from '../../components/FavoriteTeamsFixtures/FavoriteTeamsFixtures'

// styles
import styles from './Dashboard.module.css'

const Dashboard = ({ user }) => {
  const profileId = user.profile
  const [profile, setProfile] = useState([])
  const [blogs, setBlogs] = useState([])
  const [teamIds, setTeamIds] = useState([])

  useEffect(() => {
    const fetchLeagues = async () => {
      const profileData = await profileService.getProfileById(profileId)
      setProfile(profileData)
      const favoriteTeamData = profileData.favoriteTeams.map(team => team.teamId )
      setTeamIds(favoriteTeamData)
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
        {profile.interests?.length > 0 ? (
          profile.interests.map((interest) => (
            <LeagueCard key={interest._id} interest={interest} />           
            ))
            ) : (
              <p>No Favorite Leagues added visit <Link to={'/profile'}>profile page</Link> to add favorite leagues</p>
              )}
      </div>
      </div>
      <div className={styles.mainContainer}>
      <div className={styles.upcomingFixturesContainer}>
      <h2>Upcoming Fixtures</h2>
      <FavoriteTeamsFixtures 
        teamIds={teamIds} 
        user={user}
      />
      </div>
      <div className={styles.communityPlayerContainer}>
      <div className={styles.joinedCommunities}>
        <h2>Joined Communities</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.communitiesList}>
            {profile.joinedCommunities.map((community) => (
              <li key={community._id}>
                <div>
                  <Link to={`/community/${community._id}`}>
                    <img src={community.logo} alt={community.teamName} className={styles.circle} />
                  </Link>
                </div>
              </li>
              ))}
          </ul>
        ) : (
          <p>No communities joined</p>
          )}
      </div>
      <div className={styles.favoritePlayers}>
        <h2>Favorite Players</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.favoritePlayersList}>
            {profile.favoritePlayers.map((player) => (
              <li key={player._id}>
                <div>
                  <Link to={`/player/${player.playerId}/${player.teamId}/statistics`}>
                    <img  src={player.photo} alt={player.name} className={styles.circle} />
                  </Link>
                </div>
              </li>
              ))}
          </ul>
        ) : (
          <p>No favorite players added</p>
          )}
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
