// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Community from './pages/Community/Community'
import BlogForm from './pages/BlogForm/BlogForm'
import League from './pages/League/League'
import BlogComments from './pages/BlogComments/BlogComments'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/:communityId"
          element={
            <ProtectedRoute user={user}>
              <Community user={user} />
            </ProtectedRoute>
            }
        />
        <Route
          path="/blog/new"
          element={
            <ProtectedRoute user={user}>
              <BlogForm user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/league/:leagueId"
          element={
            <ProtectedRoute user={user}>
              <League user={user}/>
            </ProtectedRoute>
          }
        />
                <Route
          path="/league/:leagueId/blog/:blogId/comments"
          element={
            <ProtectedRoute user={user}>
              <BlogComments user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
