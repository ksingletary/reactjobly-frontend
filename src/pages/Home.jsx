import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="center-container">
            {!currentUser ? (
                <>
                    <h1>Welcome to Jobly</h1>
                    <div>Log in or <a href='/signup'>sign up</a> to continue</div>
                </>
            ) : (
                <>
                    <h1>Welcome to Jobly</h1>
                    <div>Find a company and apply to some <a href='/jobs'>jobs</a></div>
                </>
            )}
        </div>
    );
};

export default Home;
