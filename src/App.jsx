import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import usersService from './services/users'
import { formToJSON } from 'axios'
import axios from 'axios'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { setUser } from './reducers/loginReducer'
import { setBlogs } from './reducers/blogReducer'

import {
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'

import blogs from './services/blogs'

const App = () => {
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.login)
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationColor, setNotificationColor] = useState('red');
  const [notificationMessage, setNotificationMessage] = useState('An error has occurred');

  const [users, setUsers] = useState([])

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
      blogService.setToken(user.token)
      }
  }, [])

// Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
        try {

          const allUsers = await usersService.getAllUsers()
          console.log("au", allUsers, allUsers.length)
        //   for(let i = 0; i < allUsers.length; i++)
        //   {
        //     //const b = await usersService.getAllOfUsersBlogs(allUsers[0].id)
        //    // allUsers[i] = {...allUsers[i], blogs: b.length}
        //   }

          setUsers(allUsers);

        } catch (error) {
          // Handle error if needed
          console.error('Error fetching users:', error);
        }
      }

      const fetchAllBlogs = async () => {
        try {

          const allBlogs = await blogService.getAll()
        //   for(let i = 0; i < allUsers.length; i++)
        //   {
        //     //const b = await usersService.getAllOfUsersBlogs(allUsers[0].id)
        //    // allUsers[i] = {...allUsers[i], blogs: b.length}
        //   }

          dispatch(setBlogs(allBlogs))

        } catch (error) {
          // Handle error if needed
          console.error('Error fetching blogs:', error);
        }
      }

      fetchAllBlogs()
      fetchAllUsers()
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
        blogService.setToken(response.data.token)
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
    <div className='loggedIn'>
      <p>Logged in as {loggedInUser.username}<button className="logoutButton" onClick={logout}>LOGOUT</button></p>
      
    </div>
  )

  const padding = {
    padding: 5
  }

  return (
    <div>
      <nav>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {loggedInUser && loggedInForm()}
      </nav>
      {!loggedInUser && loginForm()}
      <div  className='mainDiv' >
    <Routes>
      <Route path="/" element={
        <div>
          <Notification isVisible={notificationVisible} color={notificationColor} message={notificationMessage}/>
          
          <h1>Your Blogs</h1>
          <BlogList loggedInUser={loggedInUser}/>
        </div>
      }/>

      <Route path="/users" element={<Users users={users}/>} />
      <Route path="/users/:id" element={<SingleUserPage users={users}/>} />
      <Route path="/blogs/:id" element={<SingleBlogPage />} />
    </Routes>
    </div>
    </div>
  )
}

export default App