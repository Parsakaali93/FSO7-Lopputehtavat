//import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import blogsService from "../services/blogs"
import { useState, useEffect } from "react"

const SingleUserPage = (props) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const b = await blogsService.getAll()
                setBlogs(b)
            }
            catch(exception){
                console.log("error fetching all blogs", exception)
            }
        }

        fetchBlogs()
    }, [])

    console.log(props)
    const id = useParams().id
    console.log(props.users)

    const user = props.users.find(u => u.id === id)

    const blogsBelongingToUser = blogs.filter(blog => user.blogs.includes(blog.id))

    console.log("user", user)
    console.log("blogsOfUser", blogsBelongingToUser)

    return (
        <div>
            <h1>{user.username}</h1>
            {blogsBelongingToUser.map((blog) => <div>{blog.title}</div>)}
        </div>
    )
}

export default SingleUserPage