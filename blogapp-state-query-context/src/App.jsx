import Login from './components/Login'
import { useUserValue } from './components/UserContext'
import Homepage from './components/Homepage'

const App = () => {
  const user = useUserValue()

  return <div>{user ? <Homepage user={user} /> : <Login />}</div>
}

export default App
