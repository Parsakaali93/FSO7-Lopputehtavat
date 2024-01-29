import { useState, useEffect } from "react"
import usersService from "../services/users"
import {
  BrowserRouter as Router,  Routes, Route, Link
} from 'react-router-dom'

const Users = ({users}) => {
  console.log("users", users)
    return (
        <div style={{marginTop:30}}>
          <h1>Users</h1>
            {!users.length > 0 && <p>Loading user data</p>}
            {users.length > 0 && users.map((user) =>  <div><Link to={`/users/${user.id}`}>{user.username}</Link> {user.blogs.length} blogs</div>)}
        </div>
    )
}

export default Users