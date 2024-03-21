import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className="place-content min-h-screen bg-warm-gray-100 text-warm-gray-800">
                {!currentUser ? (
                    <>
                        <h1 className="m-4 p-4 text-4xl font-bold">Welcome to Jobly</h1>
                        <div className="m-4 p-4">Log in or <a href='/signup' className="text-blue-500">sign up</a> to continue</div>
                    </>
                ) : (
                    <>
                        <h1 className="m-4 p-4 text-4xl font-bold">Welcome to Jobly</h1>
                        <div className="m-4 p-4">Find a company and apply to some <a href='/jobs' className="text-orange-500">jobs</a></div>
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
