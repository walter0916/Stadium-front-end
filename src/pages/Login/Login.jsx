// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

import logo from '/src/assets/stadium.png'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.container}>
      <div className={styles.formContainer}> 
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <img src={logo} alt="" />
        <h1>Log In</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={email}
            name="email"
            placeholder=''
            onChange={handleChange}
          />
          <label>Email</label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            value={password}
            name="password"
            placeholder=''
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
        </div>
        <div>
          <button className={styles.themeButton} disabled={isFormInvalid()}>
            Log In
          </button>
          <p>Don't have an account? <Link to="/auth/signup">Sign up now</Link> </p>
        </div>
      </form>
      </div>
    </main>
  )
}

export default LoginPage
