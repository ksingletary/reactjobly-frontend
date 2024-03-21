import { useEffect, useState } from "react";

import JoblyApi from "../../api";
import CompanyCard from '../components/CompanyCard'

import { Grid, TextField } from "@mui/material";

// Displays a list of companies and their information

// Protect this route with auth. If not logged in, return somewhere else

const CompaniesList = () => {
  // state declarations.
  // State for loading; State for list of companies



  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchBox, setSearchBox] = useState("");

  // Get the list of companies
  useEffect(() => {
    // build the name filter based on search box input
    let nameFilter = searchBox && `?name=${searchBox}`;

    // async fuction to get a list of companies
    async function getCompanies() {
      try {
        let res = await JoblyApi.getAllCompanies(nameFilter);
        // console.log("its res", res);
        setCompanyList(res);
        setIsLoading(false); // set loading back to false once completed.
      } catch (error) {
        console.log(error);
      }
    }

    getCompanies(); // executes the async function
    // console.log('isloading 2?',isLoading)
  }, [searchBox]);

  // handle input change of form
  const handleChange = (e) => {
    setSearchBox(e.target.value);
  };

  return (
    <>
      <div className="m-3 min-w-min">
        <h1 className="text-5xl">Companies</h1>
        <form>
          {/* <label htmlFor="companyName"></label> */}
          <TextField
            variant='outlined'
            size='medium'
            label='Search'
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Search for a company"
            onChange={handleChange}
          />
        </form>
      </div>

      <div>
        {/* Return loading if loading */}
        {isLoading && <div>loading...</div>}
        {/* Return the list if not loading */}
        {!isLoading && (
          // Companies list goes here
          <Grid container my={6} spacing={2} justifyContent='center'>
          
            {companyList.map(
              ({ handle, name, description, numEmployees, logoUrl }) => (
                <Grid item key={handle}>
                  <CompanyCard
                  key={handle}
                  handle={handle}
                  numEmployees={numEmployees}
                  name={name}
                  description={description}
                  logoUrl={logoUrl}
                />
                </Grid>
                )
                )}

          </Grid>
        )}
      </div>
    </>
  );
};

export default CompaniesList;