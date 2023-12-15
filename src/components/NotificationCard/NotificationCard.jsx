// npm modules 
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'

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

  const getNotificationLink = (notification) => {
    if (notification.blog) {
      return `/league/${notification.blog.league}/blog/${notification.blog._id}/comments`
    } else if (notification.post) {
      return `/community/${notification.post.community}`
    } else {
      return '/'
    }
  }

  const getNotificationMessage = (notification) => {
    const { type } = notification
    if (type === 'Like') {
      return 'liked your '
    } else if (type === 'Dislike') {
      return 'disliked your'
    } else if (type === 'Reply') {
      return 'replied to your'
    } else if (type === 'Comment') {
      return 'commented on your'
    }
  
  };

  return (
    <Link to={getNotificationLink(props.notification)} className={containerClass} onClick={handleCardClick}>
      <div className={styles.imgContainer}>
        <img src={props.notification.user.photo} alt="" />
      </div>
      <div className={styles.content}>
        <p>{`${props.notification.user.name} ${getNotificationMessage(props.notification)} ${props.notification.comment ? `comment on the blog "${props.notification.blog.title}"` : props.notification.blog ? `blog "${props.notification.blog.title}"` : `post in the ${props.notification.post.community.teamName} community`}`}</p>
        <small>{formatDistanceToNow(new Date(props.notification.createdAt), { addSuffix: true })}</small>
      </div>
    </Link>
  )
}

export default NotificationCard;