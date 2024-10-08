import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './components/NotificationContext'
import { UserContextProvider } from './components/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <Router>
          <App />
        </Router>
      </NotificationContextProvider>
    </QueryClientProvider>
  </UserContextProvider>
)
