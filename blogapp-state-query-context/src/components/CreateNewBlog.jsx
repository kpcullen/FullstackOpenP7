import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from './NotificationContext'
import { Form, Button, Container } from 'react-bootstrap'

const CreateNewBlog = ({ blogFormRef, user }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newBlogMututation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => [...oldBlogs, newBlog])
      notificationDispatch({ type: 'ADD_BLOG', payload: user.name })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
    onError: (error) => {
      notificationDispatch({
        type: 'BLOG_ERROR',
        payload: error.message,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
  })

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const author = formData.get('blogAuthor')
    const title = formData.get('blogTitle')
    const url = formData.get('blogUrl')
    const newBlog = {
      author,
      title,
      url,
    }
    newBlogMututation.mutate(newBlog)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Container>
      <Form onSubmit={handleBlogSubmit}>
        <Form.Group className="sm-3" controlId="blogTitle">
          <Form.Label>Blog title</Form.Label>
          <Form.Control
            type="text"
            name="blogTitle"
            placeholder="enter blog title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="blogUrl">
          <Form.Label>Blog URL</Form.Label>
          <Form.Control
            type="text"
            name="blogUrl"
            placeholder="enter blog url"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Blog Author</Form.Label>
          <Form.Control
            type="text"
            name="blogAuthor"
            placeholder="enter blog author"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreateNewBlog
