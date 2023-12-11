// npm modules
import { useState, useEffect } from 'react';

// services
import * as notificationService from '../../services/notificationService';

const Notifications = (props) => {
  const [notifications, setNotifications] = useState({})

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await notificationService.getUserNotifications(props.profile._id)
      setNotifications(data)
    }
    fetchNotifications()
  }, [props.profile._id])

  console.log(notifications)

  return (
    <div>
      {notifications.length ? (
        <div>
          {notifications.map((notification) => <p key={notification._id}>{`${notification.user.name} has left a ${notification.type} on your ${notification.blog ? 'blog' : 'post'}`}</p>)}
        </div>
      ) : ''}
    </div>
  )
}

export default Notifications;