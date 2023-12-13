// npm modules 
import { formatDistanceToNow } from 'date-fns';

// styles 
import styles from './NotificationCard.module.css'


const NotificationCard = (props) => {
  const containerClass = `${styles.notificationContainer} ${props.notification.read ? '' : styles.unread}`

  return (
    <div className={containerClass}>
      <div className={styles.imgContainer}>
        <img src={props.notification.user.photo} alt="" />
      </div>
      <div className={styles.content}>
        <p>{`${props.notification.user.name} has left a ${props.notification.type} on your ${props.notification.blog ? 'blog' : props.notification.comment ? 'comment' : 'post'}`}</p>
        <small>{formatDistanceToNow(new Date(props.notification.createdAt), { addSuffix: true })}</small>
      </div>
    </div>
  )
}

export default NotificationCard;