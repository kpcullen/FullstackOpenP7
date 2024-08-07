import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return {
        type: 'success',
        message: `A new blog by ${action.payload} has been added!`,
      }
    case 'BLOG_ERROR':
      return {
        type: 'danger',
        message: `There was an error creating a new blog. Try again. (Error: ${action.payload})`,
      }
    case 'LOGIN_ERROR':
      return { type: 'danger', message: 'Wrong login details!' }
    case 'LIKE':
      return { type: 'success', message: `You have liked ${action.payload}` }
    case 'LIKE_ERROR':
      return {
        type: 'danger',
        message: 'There was a problem liking this blog',
      }
    case 'REMOVE_BLOG':
      return { type: 'success', message: 'Blog has been successfully deleted' }
    case 'REMOVE_BLOG_ERROR':
      return {
        type: 'danger',
        message: `Error removing blog: ${action.payload}`,
      }
    case 'ADD_COMMENT':
      return {
        type: 'success',
        message: 'Comment successfully added',
      }
    case 'COMMENT_ERROR':
      return {
        type: 'danger',
        message: `Error adding your comment: ${action.payload}`,
      }
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    type: '',
    message: '',
  })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
