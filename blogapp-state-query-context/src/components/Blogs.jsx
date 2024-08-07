import Blog from './Blog'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'
import blogService from '../services/blogs'
import { useRef } from 'react'
import { useUserValue } from './UserContext'
import { useQuery } from '@tanstack/react-query'
import { Container, Table } from 'react-bootstrap'

const Blogs = () => {
  const blogFormRef = useRef()
  const user = useUserValue()

  const { isPending, data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retechOnWindowFocus: false,
    retry: 1,
  })

  if (isPending) return <div>Blogs are loading...</div>

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <Container>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <CreateNewBlog blogs={blogs} user={user} blogFormRef={blogFormRef} />
      </Togglable>
      <h2>Added blogs:</h2>
      <Table striped>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Blogs
