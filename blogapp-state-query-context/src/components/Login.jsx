import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'
import Notification from './Notification'
import { Form, Button, Container } from 'react-bootstrap'

const Login = () => {
  const queryClient = useQueryClient()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')
    login.mutate({ username, password })
  }

  const login = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      queryClient.setQueryData('auth', user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
    },
    onError: () => {
      notificationDispatch({ type: 'LOGIN_ERROR' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
    }
  }, [userDispatch])

  return (
    <Container>
      <Notification />
      <h2>BlogApp Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" name="password" />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
