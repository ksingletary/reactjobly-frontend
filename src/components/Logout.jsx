import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

const Logout = () => {
    const { logoutUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        logoutUser(); // Logout the user
        setCurrentUser(''); // Clear current user data
    }, [setCurrentUser, logoutUser]);

    // Render the Navigate component to redirect to the home page
    return <Navigate to="/" />;
};

export default Logout;
