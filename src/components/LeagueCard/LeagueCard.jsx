// npm modules
import { Link } from 'react-router-dom'

// styles
import styles from './LeagueCard.module.css'

const LeagueCard = (props) => {

  return (
    <div className={styles.logoContainer}>
      <Link to={`/league/${props.interest._id}`}>
      <img src={props.interest.logo} alt="" className={styles.logo}/>  
      </Link>
    </div>
  )
}

export default LeagueCard