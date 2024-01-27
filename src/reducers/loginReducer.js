import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
     reducers:{
      setUser(state, action){
        console.log("login act pld", action.payload)
        return action.payload
      },
    }
})

  export const { setUser } = loginSlice.actions
  export default loginSlice.reducer