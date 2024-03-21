import { useState } from "react";

import { TextField, Stack, Button, Container } from "@mui/material";

const ProfileUpdateForm = ({ INITIAL_FORM_DATA, updateProfile }) => {
  // user can update their firstname, lastname, and email. Password is required to make changes

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("attempting udpate");
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <>
      <h3>Make changes to your profile below</h3>
<Container component='div' align='center'>
      <Stack
        my={10}
        spacing={4}
        component="form"
        onSubmit={handleSubmit}
        width={400}
      >
        <TextField
          disabled
          className="m-3 p-4 rounded-md text-black"
          // name="username"
          // id="username"
          type="text"
          placeholder={formData.username}
        />
        <TextField
          className="m-3 p-4 rounded-md text-black"
          name="firstName"
          id="firstName"
          type="text"
          onChange={handleChange}
          value={formData.firstName}
        />
        <TextField
          className="m-3 p-4 rounded-md text-black"
          name="lastName"
          id="lastName"
          type="text"
          onChange={handleChange}
          value={formData.lastName}
        />
        <TextField
          className="m-3 p-4 rounded-md text-black"
          name="email"
          id="email"
          type="email"
          placeholder=""
          onChange={handleChange}
          value={formData.email}
        />
        <Button variant="contained" type="submit">
          Update
        </Button>
      </Stack>
      </Container>
    </>
  );
};

export default ProfileUpdateForm;