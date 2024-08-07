import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import { useUserValue } from './UserContext'
import { useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'

const BlogDetails = () => {
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const navigate = useNavigate()

  const user = useUserValue()
  const { id: blogId } = useParams()
  const { data: blog, isPending } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getBlog(blogId),
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (returnedBlog) => {
      console.log('ReturnedBlog', returnedBlog)
      queryClient.invalidateQueries(['blogs'])
      notificationDispatch({ type: 'LIKE', payload: returnedBlog.title })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({ type: 'LIKE_ERROR', payload: error })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
  })

  const handleLike = (blog) => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog?.user?.id,
    })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      notificationDispatch({ type: 'REMOVE_BLOG' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
      navigate('/blogs')
    },
    onError: (error) => {
      notificationDispatch({
        type: 'REMOVE_BLOG_ERROR',
        payload: error.message,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
  })

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteBlogMutation.mutate(blog.id)
    } else return
  }

  const addCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) =>
      blogService.addComment(blogId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['blog', blogId])
      notificationDispatch({ type: 'ADD_COMMENT' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
    onError: (error) => {
      notificationDispatch({ type: 'COMMENT_ERROR', payload: error.message })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
  })

  const handleAddComment = (e) => {
    e.preventDefault()
    addCommentMutation.mutate({ blogId, comment })
    setComment('')
  }

  if (isPending) return <div>Blog loading...</div>

  const formattedUrl =
    blog.url.startsWith('http://') || blog.url.startsWith('https://')
      ? blog.url
      : `http://${blog.url}`

  return (
    <Container>
      <h2>
        {blog.title} written by {blog.author}
      </h2>
      <a href={formattedUrl} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div>
        Total likes: {blog.likes}{' '}
        <Button
          className="ms-2"
          variant="primary"
          size="sm"
          onClick={() => handleLike(blog)}
        >
          Like
        </Button>
      </div>
      added by {blog.user.name}{' '}
      {user.username === blog.user.username ? (
        <Button
          className="ms-2 mt-2"
          variant="outline-danger"
          size="sm"
          onClick={() => handleDelete(blog)}
        >
          Remove blog
        </Button>
      ) : (
        ''
      )}
      <Table striped>
        <thead>
          <tr>
            <th>
              <h3>Comments</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {blog.comments.map((comment, i) => (
            <tr key={i}>
              <td>{comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          placeholder="Add your comment"
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />{' '}
        <Button className="ms-2" variant="primary" size="sm" type="submit">
          Add comment
        </Button>
      </form>
    </Container>
  )
}

export default BlogDetails
