import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Button, Box } from '@mui/material';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

const Navbar = () => {
  const { currentUser, setToken, LOCAL_STORAGE_KEY, logoutUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Log out the user. Removes their token and data from local storage
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setToken(null);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            align="left"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              JOBLY
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            {currentUser ? (
              <>
                <Button color="inherit" onClick={() => navigate('/companies')}>Companies</Button>
                <Button color="inherit" onClick={() => navigate('/jobs')}>Jobs</Button>
                <Button color="inherit" onClick={() => navigate(`/${currentUser.username}`)}>{currentUser.username}</Button>
                <Button color="inherit" onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Sign In</Button>
                <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Adding a Box with a top margin to ensure content below isn't hidden */}
      <Box sx={{ mt: 8 }}>
        {/* The rest of your page content */}
      </Box>
    </>
  );
};

export default Navbar;
