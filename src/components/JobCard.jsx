import ApplyButton from "./ApplyButton";
import JoblyApi from "../../api";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const JobCard = ({ title, salary, equity, id, companyName }) => {
  const { currentUser } = useContext(UserContext);
  
  // Add a safety check for currentUser and its properties
  const applications = currentUser ? currentUser.applications : [];

  // Check if user has applied
  const [hasApplied, setHasApplied] = useState(() => applications.includes(id));

  // Use API to apply based on username and job id
  const applyToJob = async () => {
    try {
      if (!currentUser) {
        console.error("User is not logged in.");
        return;  // Optionally handle this case in your UI, e.g., by showing a login prompt
      }
      console.log("Applying with:", currentUser.username, id);  // Ensure these values are correct
      await JoblyApi.applyToJob(currentUser.username, id);
      console.log("Successfully applied to job", id, title);
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying to job:", id, "Error:", error);
    }
  };

  return (
    <Card sx={{ width: 325 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{companyName}</Typography>
        {salary && (
          <Typography variant="body1">
            ${salary.toLocaleString()} salary & {(equity * 100).toFixed(2)}% equity
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <ApplyButton
          jobId={id}
          applyToJob={applyToJob}
          hasApplied={hasApplied}
        />
      </CardActions>
    </Card>
  );
};

export default JobCard;
