import JobCard from "../components/JobCard";
import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Box, Container, Card, Grid } from "@mui/material";

const JobsList = () => {
  const { currentUser } = useContext(UserContext);

  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await JoblyApi.getAllJobs();
        setJobsList(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    getJobs();
  }, [currentUser.applications]);

  return (
    <Container align="auto">
      <div className="m-3">
        <h1 className="text-5xl">Jobs</h1>
      </div>

      {error && <div>Something messed up: {error}</div>}
      {isLoading && <div>One moment please...</div>}
      {!isLoading && !error && (
        <Grid container spacing={4} justifyContent="center">
          {jobsList.map(({ id, title, salary, equity, companyName }) => (
            <Grid item key={id} p={3}>
              <JobCard
                id={id}
                title={title}
                salary={salary}
                equity={equity}
                companyName={companyName}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default JobsList;