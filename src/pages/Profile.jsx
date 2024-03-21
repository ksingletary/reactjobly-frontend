import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import JoblyApi from "../../api";
import JobCard from "../components/JobCard";
import { Grid } from "@mui/material";

import ProfileUpdateForm from "../components/ProfileUpdateForm";

// User's profile page.
const Profile = () => {
  const { username } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log("currentUser from context:", currentUser);

  // user can update their firstname, lastname, and email.

  const [isLoading, setIsLoading] = useState(true);
  const [initialFormData, setInitialFormData] = useState({ ...currentUser });

  // async fuction to set initial form data based on user
  useEffect(() => {
    // console.log("setting initialform data", currentUser);
    setInitialFormData(() => currentUser);
    // setFormIsSubmitted(false);
    setIsLoading(false);
  }, [currentUser]);

  const updateProfile = async (formData) => {
    try {
      let res = await JoblyApi.updateProfile(username, formData);
      // console.log("profile update res", res);
      setIsLoading(true);
      setCurrentUser(() => res);
    } catch (error) {
      console.log("error updating profile:", error);
    }
  };
  // title, salary, equity, id, companyName
  // const userJobs = currentUser.jobs;
  console.log("user jobs", currentUser);

  return (
    <>
      {!isLoading && currentUser && (
        <div>
          <h1>Hello {currentUser.firstName}</h1>
          
            <ProfileUpdateForm
              INITIAL_FORM_DATA={initialFormData}
              updateProfile={updateProfile}
            />

        </div>
      )}
    </>
  );
};

export default Profile;