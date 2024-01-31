import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getToken = () => {
  return token
}

const setToken = newToken => {
  console.log("setting token to", newToken)
  token = `Bearer ${newToken}` 
  console.log("token changed to", token)
}

const getAllForUser = (user) => {
  console.log("getAllForUser", user)
  const request = axios.get(baseUrl, user)
  return request.then(response => response.data)
}

const addBlogService = async (user, blog) => {
  console.log('config in addblog service ', JSON.stringify(user))

  const response = await axios.post(baseUrl, blog, user)
  return response.data
}

const deleteBlog = (id) => {
  if(window.confirm('Do you really want to delete this blog?'))
  {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
}

const postComment = async (comment) => {
  const response = await axios.post(`${baseUrl}/${comment.id}/comments`, comment)
  return response.data
}

const getComments = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, blog, user)
  return response.data
}

const updateBlog = (blog) => {
  console.log(blog.id)
  console.log(blog)
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

export default { getAll, getAllForUser, addBlogService, deleteBlog, updateBlog, getToken, setToken, postComment }