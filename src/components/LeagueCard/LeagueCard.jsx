import logo from '../../assets/laliga.svg'
import styles from './LeagueCard.module.css'

const LeagueCard = () => {
  return (
    <div>
      <img src={logo} alt="" className={styles.logo}/>
      
    </div>
  );
}

export default LeagueCard;