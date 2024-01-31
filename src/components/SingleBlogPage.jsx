//import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import blogsService from "../services/blogs"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const SingleBlogPage = (props) => {
    const [newComment, setNewComment] = useState('')
    const [blogComments, setBlogComments] = useState([])

    const handleChange = (event) => {
        setNewComment(event.target.value)
      }

    const { id } = useParams()
    useSelector(state => console.log("state", state))
    const blogs = [...useSelector(state => state.blogs)]
    const correspondingBlog = blogs.find((blog) => blog.id === id)
    
    useEffect(() => {
        if(correspondingBlog)
        {
            setBlogComments(correspondingBlog.comments)
            console.log(correspondingBlog.comments)
        }
    }, [correspondingBlog]);

    console.log(id)

    const postComment = async (event) => {
        event.preventDefault()
        
        const commentObj = {
            comment: newComment,
            id: id
        }
        
        setNewComment('')
        const response = await blogsService.postComment(commentObj)
        console.log(response)
        setBlogComments(response.comments)
      }

    if (!correspondingBlog) {
        return <p>Blog not found</p>;
    }

    return (
        <div>
            <h1>{correspondingBlog.title}</h1>
            <p>{correspondingBlog.author}</p>
            <p>{correspondingBlog.likes} Likes</p>
            <h3 style={{marginTop:30}}>Comments</h3>
            {blogComments.map((comment) => <p style={{margin:0}}>{comment}</p>)}
            <form onSubmit={postComment} style={{marginTop:30}}>
            <textarea style={{width:300, height:100}} onChange={handleChange} value={newComment} placeholder="Leave a comment..." name="commentField" />
            <button style={{display:"block"}} type="submit">Post</button>
            </form>
        </div>
    )
}

export default SingleBlogPage