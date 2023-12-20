// npm modules
import { useState, useEffect } from 'react'

// components 
import NotificationCard from '../NotificationCard/NotificationCard'

// services
import * as notificationService from '../../services/notificationService'

const Notifications = (props) => {
  const [notifications, setNotifications] = useState({})

  useEffect(() => {
    const fetchNotifications = async () => {
      if (props.profile._id) {
        const data = await notificationService.getUserNotifications(props.profile._id)
        setNotifications(data)
      }
    }
    fetchNotifications()
  }, [props.profile._id])

  console.log(notifications)

  return (
    <div>
      {notifications.length ? (
        <div>
          {notifications.map((notification) => 
          <NotificationCard key={notification._id} notification={notification} />)}
        </div>
      ) : ''}
    </div>
  )
}

export default Notifications;