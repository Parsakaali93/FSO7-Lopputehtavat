import axios from 'axios'
const baseUrl = '/api/users'
let token = null

const setToken = newToken => { 
  console.log("setting token to", newToken)
  token = `Bearer ${newToken}` 
  console.log("token changed to", token)
}

const getToken = () => { 
  return token
}

const getAllUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllOfUsersBlogs = () => {
  
  console.log("Token", token)
  const config = { headers: { Authorization: token }, }
  console.log("Config", config)

  const request = axios.get(`${baseUrl}/blogs`, config)
  return request.then(response => response.data)
}

export default { getAllUsers, getAllOfUsersBlogs, setToken, getToken }