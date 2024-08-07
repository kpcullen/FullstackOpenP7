import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const Users = () => {
  const { isPending, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retechOnWindowFocus: false,
    retry: 1,
  })

  if (isPending) return <div>Loading users...</div>

  return (
    <Container>
      <h3>Users of BlogApp</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
