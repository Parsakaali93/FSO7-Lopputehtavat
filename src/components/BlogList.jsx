import blogService from '../services/blogs.js'
import usersService from '../services/users.js'

import { useState, useEffect, useRef } from 'react'
import Togglable from './Togglable.jsx'
import AddBlogForm from './AddBlogForm.jsx'
import Blog from './Blog.jsx'
import { useDispatch, useSelector } from "react-redux"
import { addBlog, setBlogs, changeBlog, removeBlog } from '../reducers/blogReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'
const BlogList = ({loggedInUser}) => {
    console.log("Component rendering");
    //const [blogs, setBlogs] = useState([])
    const blogs = [...useSelector(state => state.blogs)]

    const addBlogFormRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
      console.log("serv", usersService)
      if(usersService.getToken()){
        console.log("ustoken", usersService.getToken())

        usersService.getAllOfUsersBlogs()
        .then(blogs => {dispatch(setBlogs(blogs))})
        .catch(exception => {console.log("exception in useEffect to fetch all blogs of a user", exception)})
      }
    },  [usersService.getToken()])


      const updateBlog = async(blog) => {
      try{
          const updatedBlog = await blogService.updateBlog(blog)
          dispatch(changeBlog(updatedBlog))
          dispatch(showNotification(`Voted for ${updatedBlog.title}`, "purple", 3))
          // setBlogs(oldBlogs => oldBlogs.map(oldBlog =>
          // oldBlog.id === updatedBlog.id ? updatedBlog : oldBlog
          // ))
      }
  
      catch(exception){
          console.log(exception)
      }}

    const deleteBlog = async (id) => {
        try{
          const response = await blogService.deleteBlog(id)
          dispatch(removeBlog(id))
          //showNotification("red", "Successfully deleted blog")
          dispatch(showNotification("Successfully deleted blog", "purple", 3))
        }
    
        catch{

        }

        
        //setBlogs(oldBlogs => oldBlogs.filter(oldBlog => oldBlog.id !== id))
      }

      const submitBlog = async (blog) => {

        //console.log(`Adding blog ${JSON.stringify(blog)} for user ${JSON.stringify(config)}`)
        const config = { headers: { Authorization: blogService.token }, }
    
        try{
          const response = await blogService.addBlogService(config, blog)
          
          dispatch(addBlog(response))
          //setBlogs((oldBlogs) => [...oldBlogs, response])


          //showNotification("green", `Successfully added blog ${response.title} by ${response.author}`)
          addBlogFormRef.current.toggleVisibility()
        }
    
        catch(exception){
          //showNotification("red", exception)
        }
      }

    return (
        <div>
          
        {loggedInUser && <Togglable buttonLabel="Add New Blog" ref={addBlogFormRef}>
            <AddBlogForm submitBlog={submitBlog}/>
        </Togglable>}

        {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} deleteBlog={() => deleteBlog(blog.id)} blog={blog} incrementLikes={updateBlog} />
        )}
        </div>
    )
}

export default BlogList