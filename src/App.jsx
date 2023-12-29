// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Community from './pages/Community/Community'
import BlogForm from './pages/BlogForm/BlogForm'
import League from './pages/League/League'
import BlogComments from './pages/BlogComments/BlogComments'
import Blog from './pages/Blog/Blog'
import Profile from './pages/Profile/Profile'
import Standings from './pages/Standings/Standings'

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
    navigate('/auth/login')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute user={user}> 
              <Dashboard user={user} />
            </ProtectedRoute>  
          } 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user}/>
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
          path="/league/:leagueId/standings"
          element={
            <ProtectedRoute user={user}>
              <Standings user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/league/:leagueId/blog/:blogId"
          element={
            <ProtectedRoute user={user}>
              <Blog user={user}/>
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
