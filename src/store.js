import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer
    }
})