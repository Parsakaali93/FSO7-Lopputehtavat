import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import usersService from './services/users'
import { formToJSON } from 'axios'
import axios from 'axios'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { setUser } from './reducers/loginReducer'

import {
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.login)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationColor, setNotificationColor] = useState('red');
  const [notificationMessage, setNotificationMessage] = useState('An error has occurred');


  console.log("App render")
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("user localstorage", user)
      //setLoggedInUser(user)
      dispatch(setUser(user))
      console.log("token from localstorage", user.token)
      usersService.setToken(user.token)
      }
  }, [])

  // Test user: Maukkis hunter3
  const handleLogin = async (event) => {
    event.preventDefault()

    try{
        console.log('logging in with', username, password)
        const response = await axios.post('/api/login', { username, password })
        dispatch(setUser(response.data))
        setUsername('')
        setPassword('')
        window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))

        console.log("token from login", response.data.token)

        usersService.setToken(response.data.token)
    }

    catch(exception){
      console.log(exception)
    }
  }

  const test = () => {
    console.log(loggedInUser)
  }

  const logout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div> USERNAME
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div> PASSWORD
        <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button type="submit">LOGIN</button>
    </form>
  )

  const loggedInForm = () => (
    <div>
      <p>Logged in as {loggedInUser.username}</p>
      <button onClick={logout}>LOGOUT</button>
    </div>
  )

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>

    <Routes>
      <Route path="/" element={
        <div>
          {!loggedInUser && loginForm()}
          {loggedInUser && loggedInForm()}
          
          <button onClick={test}>TEST</button>
          
          <Notification isVisible={notificationVisible} color={notificationColor} message={notificationMessage}/>
          
          <h2>blogs</h2>
          <BlogList loggedInUser={loggedInUser}/>
        </div>
      }/>

      <Route path="/users" element={<Users />} />
    </Routes>
    </div>
  )
}

export default App