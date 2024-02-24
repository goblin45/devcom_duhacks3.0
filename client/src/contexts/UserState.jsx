import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext(null)

const UserState = (props) => {
    const blankUser = {
        name: '',
        dp: ''
    }

    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState()

    const getInitialUser = () => {
        const existingUser = JSON.parse(localStorage.getItem('user'))
        if (existingUser) {
            setUser({...existingUser})
            setLoggedIn(true)
            // console.log('logged in from getIntialUser', existingUser)
        } else {
            setUser({...blankUser})
            setLoggedIn(false)
        }
    }

    const updateUser = (newUser) => {
        setUser({...newUser})
        setLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(newUser))
        localStorage.setItem('token', token);
    } 

    const logoutUser = () => {
        setUser({...blankUser})
        localStorage.removeItem('user')
        localStorage.removeItem('token');
        setLoggedIn(false)
    }

    return (
        <UserContext.Provider value={{user, updateUser, logoutUser, loggedIn, getInitialUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState