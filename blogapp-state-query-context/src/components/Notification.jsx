import { useNotificationValue } from './NotificationContext'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null

  return <Alert variant={`${notification.type}`}>{notification.message}</Alert>
}

export default Notification
