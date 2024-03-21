import ApplyButton from "./ApplyButton";
import JoblyApi from "../../api";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

const JobCard = ({ title, salary, equity, id, companyName }) => {
  const { currentUser } = useContext(UserContext);

  const { applications } = currentUser;

  // For each job, evaluate if user has applied or not. Result is passed to the Apply button element.

  const [hasApplied, setHasApplied] = useState(() => {
    return applications && applications.includes(id);
});

  

  // Use api to apply based on username and job id.
  // Upon success, set state of hasApplied to true
  const applyToJob = async () => {
    try {
      // console.log('username',currentUser.username,'id',id)
      await JoblyApi.applyToJob(currentUser.username, id);
      // console.log("applied res:", res);
      console.log("you applied to job", id, title);
      setHasApplied(true);
    } catch (error) {
      console.log("error applying:", error);
    }
  };


  return (
    <Card sx={{ width: 325 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{companyName}</Typography>
        {salary && (<Typography variant="body1">
          ${salary || 0} salary & {(equity * 100).toFixed(2)}% equity
        </Typography>)}
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