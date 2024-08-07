import { Link, Route, Routes } from 'react-router-dom'
import Blogs from './Blogs'
import Users from './Users'
import User from './User'
import blogService from '../services/blogs'
import { useUserDispatch } from './UserContext'
import BlogDetails from './BlogDetails'
import { useEffect } from 'react'
import Notification from './Notification'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

const Homepage = ({ user }) => {
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  })

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    userDispatch({ type: 'LOGOUT' })
  }
  const navStyle = {
    padding: 5,
    textDecoration: 'none',
  }

  const headerStyle = {
    padding: 8,
    fontSize: '4em',
    paddingLeft: '1rem',
  }

  return (
    <Container>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogs" as="span">
              <Link style={navStyle} to="/blogs">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="/users" as="span">
              <Link style={navStyle} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Navbar.Text>
              <em>{user.username} is logged in</em>
            </Navbar.Text>
            <Nav.Link>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Notification />
        <h2 style={headerStyle}>BlogApp Website</h2>

        <Routes>
          <Route path="/" element={<Blogs user={user} />} />
          <Route path="/blogs" element={<Blogs user={user} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <footer>
          <br />
          <em>
            BlogApp by Kevin Cullen, built using NodeJS, Express, MongoDB, React
            and React Router to fulfill requirements of Fullstack Open via the
            University of Helsinki Department of Computer Science
          </em>
        </footer>
      </div>
    </Container>
  )
}

export default Homepage
