import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import LeagueCard from '../../components/LeagueCard/LeagueCard';
import * as leagueService from '../../services/leagueService';
import * as profileService from '../../services/profileService';
import SearchBar from '../../components/SearchBar/SearchBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Landing = ({ user }) => {
  const [leagues, setLeagues] = useState([])
  const [profile, setProfile] = useState([])

  library.add(fas)

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await leagueService.getAllLeagues()
      const profileData = await profileService.getProfileById()
      setLeagues(data)
      setProfile(profileData)
    };
    fetchLeagues()
  }, [])

  console.log(leagues)
  console.log(profile)

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
      <div className={styles.secondContainer}>
      <div className={styles.communitiesNotificationContainer}>

      <div className={styles.joinedCommunities}>
        <h2>Joined Communities</h2>
        {profile.joinedCommunities ? (
          <ul className={styles.communitiesList}>
            {profile.joinedCommunities.map((community) => (
              <li key={community.id}>{community.teamName}</li>
              ))}
          </ul>
        ) : (
          <p>No communities joined</p>
          )}
      </div>
      {/* New section: Notifications */}
      <div className={styles.notifications}>
        <h2>Notifications</h2>
        <FontAwesomeIcon icon={['fas', 'bell']} className={styles.bell} />
        <p>{/* Display notification count */}</p>
        {/* Link to notifications page */}
        <a href="/profile/notifications">See All</a>
      </div>
      {/* New section: Trending Blogs */}
        </div>
      <div className={styles.trendingBlogs}>
        <h2>Trending Blogs</h2>
        {/*
          Render trending blogs based on likes, comments, and user interests
        */}
        {/* Sample blog */}
        <div className={styles.trendingBlog}>
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
