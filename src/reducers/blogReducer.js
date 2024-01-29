import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
     reducers:{
      addBlog(state, action){
        console.log(action.payload)
        return [...state, action.payload]
      },

      setBlogs(state, action){
        console.log("setBlogs", action.payload)
        return action.payload
      },

      changeBlog(state, action){
        const updatedBlog = action.payload;

        return state.map(blog =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      },

      removeBlog(state, action) {
        const blogIdToDelete = action.payload;
  
        // Create a new array that excludes the blog to be deleted
        return state.filter(blog => blog.id !== blogIdToDelete);
      },
    }
})

  export const { addBlog, setBlogs, changeBlog, removeBlog } = blogSlice.actions
  export default blogSlice.reducer