import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from '../context/UserContext'

const Logout = () => {
    // log the user out
    const {logoutUser, setCurrentUser} = useContext(UserContext)
    setCurrentUser('')
    logoutUser()
    return (
        <>
        <Navigate onClick={() => logoutUser()} to="/"/>
        </>
     )
}

export default Logout