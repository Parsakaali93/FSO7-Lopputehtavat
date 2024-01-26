import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: 'blog',
  initialState: {text: 'Initial Notification', display: false},
     reducers:{
      setNotificiation(state, action){
        console.log(action.payload)
        return action.payload
      },
    }
})

export const showNotification = (text, color, time) => {
  return async dispatch => {
     dispatch(setNotificiation({text: text, color: color, display: true}))
     
     setTimeout(() => {
      dispatch(setNotificiation({text: text, color: color, display: false}))
    }, time * 1000)
 }
}

  export const { setNotificiation, clearNotification } = notificationSlice.actions
  export default notificationSlice.reducer