import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import JoblyApi from "../../api";
import JobCard from "./JobCard";
import UserContext from "../context/UserContext";

const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function getCompany(handle) {
      try {
        let res = await JoblyApi.getCompany(handle);
        setCompany(res);
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getCompany(handle);
  }, [handle]);

  return (
    <Box sx={{ p: 4, mx: 'auto', mt: 18, maxWidth: 1200 }}>
      {isLoading ? (
        <Typography>Loading company data...</Typography>
      ) : (
        company && (
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h3">{company.name}</Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
              {company.description}
            </Typography>
          </Paper>
        )
      )}

      {!isLoading && company.jobs && (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Jobs at {company.name}
          </Typography>
          {company.jobs.length ? (
            <Grid container spacing={3}>
              {company.jobs.map(job => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <JobCard
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    id={job.id}
                    companyName={company.name}
                    currentUser={currentUser}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No jobs listed.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Company;
