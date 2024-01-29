import { useState, useEffect } from "react"
import usersService from "../services/users"

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {

              const allUsers = await usersService.getAllUsers()
              console.log("au", allUsers, allUsers.length)

            //   for(let i = 0; i < allUsers.length; i++)
            //   {
            //     //const b = await usersService.getAllOfUsersBlogs(allUsers[0].id)
            //    // allUsers[i] = {...allUsers[i], blogs: b.length}
            //   }

              setUsers(allUsers);

            } catch (error) {
              // Handle error if needed
              console.error('Error fetching users:', error);
            }
          }

          fetchAllUsers();
      }, [])

    return (
        <div>
            {users.map((user) => <div>{user.username} {user.blogs.length} blogs</div>)}
        </div>
    )
}

export default Users