import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import {Navigate} from 'react-router-dom'
import { TextField, Button, Box, Container, Stack } from "@mui/material";

const Login = () => {

  // Prefilled form fields for dev convenience.
  const INITIAL_FORM_DATA = {
    // username: "guestuser",
    // password: "123456",
    username: "",
    password: ""
  };

  const { loginFormSubmit, currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log('login submitted')
    e.preventDefault();
    loginFormSubmit(formData);
    // take person to companies page after 1 second
  };
  if (currentUser) {
    return <Navigate to="/" />;
}


  return (
    <>
      <Container py={4}>
        <h1>Log in to continue</h1>
        <Box p={4} margin="auto" sx={{ maxWidth: 400 }}>
          <form onSubmit={handleSubmit}>
            <Stack component="div" spacing={5}>
              <TextField
                required
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />

              <TextField
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <Box margin="auto">
                <Button type='submit' sx={{ width: 170, height: 50 }} variant="contained">
                  Log In
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;