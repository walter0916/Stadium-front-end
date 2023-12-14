// npm modules 
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

// services 
import * as notificationService from '../../services/notificationService'

// styles 
import styles from './NotificationCard.module.css'


const NotificationCard = (props) => {
  const [isRead, setIsRead] = useState(props.notification.read)
  const containerClass = `${styles.notificationContainer} ${isRead ? '' : styles.unread}`

  const handleCardClick = async () => {
    await notificationService.updateStatus(props.notification._id, true)
    setIsRead(true)
  }


  return (
    <div className={containerClass}  onClick={handleCardClick}>
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