import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { TextField, Button, Stack, Box, Container } from "@mui/material";

const Signup = () => {
  // get context from context holder
  const { signupFormSubmit } = useContext(UserContext);

  // Prefilled form fields for dev convenience.
  // const INITIAL_FORM_DATA ={
  //     firstName:'keith',
  //     lastName:'singletary',
  //     email:'keith@gmail.com',
  //     username:'keithsing',
  //     password:'123456'
  // }
  // Use this version of initial data for prod
  const INITIAL_FORM_DATA = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log('signup submitted')
    e.preventDefault();
    // do something with the form data
    signupFormSubmit(formData);
    // reset the form
    setFormData(() => INITIAL_FORM_DATA);
  };

  return (
    <Container py={4}>
      <h1>Create a new account</h1>
      <Box p={4} margin="auto" maxWidth={400}>
        <h2 className="text">Enter your information to get started</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
          {/* <label htmlFor="firstName">/label> */}
            <TextField
              className="m-2 p-2 rounded-lg"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              className="m-2 p-2 rounded-lg"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              className="m-2 p-2 rounded-lg"
              type="text"
              name="username"
              id="username"
              placeholder="Pick a username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              className="m-2 p-2 rounded-lg"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Box margin="auto">
              <Button type="submit" sx={{ width: 170, height: 50 }} variant="contained">
                Sign Up
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;