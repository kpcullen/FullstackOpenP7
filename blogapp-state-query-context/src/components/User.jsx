import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import usersServices from '../services/users'
import { Container } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => usersServices.getUser(id),
  })

  if (isLoading) return <div>Users is loading...</div>

  return (
    <Container>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <li>{blog.title}</li>
          </Link>
        ))}
      </ul>
    </Container>
  )
}

export default User
