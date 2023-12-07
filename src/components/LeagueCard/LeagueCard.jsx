import laliga from '../../assets/laliga.svg'
import premierLeagueLogo from '../../assets/premier-league.svg'
import serieALogo from '../../assets/serieA.svg'
import bundesligaLogo from '../../assets/bundesliga.svg'
import mlsLogo from '../../assets/mls.svg'
import ligue1Logo from '../../assets/ligue-1.svg'
import europaLogo from '../../assets/europa.svg'
import championsLogo from '../../assets/champions.svg'
import styles from './LeagueCard.module.css'
import { Link } from 'react-router-dom'

const LeagueCard = (props) => {
  console.log(props)
  console.log('League Name:', props.interest.leagueName)
  let logo = null

  // Check if props.leagueName is defined before calling toLowerCase()
  if (props.interest.leagueName && typeof props.interest.leagueName === 'string') {
    switch (props.interest.leagueName.toLowerCase()) {
      case 'laliga':
        logo = laliga
        break
      case 'premier league':
        logo = premierLeagueLogo
        break
      case 'serie a':
        logo = serieALogo
        break
      case 'bundesliga':
        logo = bundesligaLogo
        break
      case 'mls':
        logo = mlsLogo
        break
      case 'ligue 1':
        logo = ligue1Logo
        break
      case 'champions league':
        logo = championsLogo
        break
      case 'europa league':
        logo = europaLogo
        break
      default:
        logo = laliga
        break
    }
  }


  return (
    <div className={styles.logoContainer}>
      <Link to={`/league/${props.interest._id}`}>
      <img src={logo} alt="" className={styles.logo}/>  
      </Link>
    </div>
  );
}

export default LeagueCard;