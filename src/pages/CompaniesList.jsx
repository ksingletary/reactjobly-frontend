import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import CompanyCard from '../components/CompanyCard';
import { Grid, TextField, Box } from "@mui/material";

const CompaniesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchBox, setSearchBox] = useState("");

  useEffect(() => {
    let nameFilter = searchBox && `?name=${searchBox}`;

    async function getCompanies() {
      try {
        let res = await JoblyApi.getAllCompanies(nameFilter);
        setCompanyList(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCompanies();
  }, [searchBox]);

  const handleChange = (e) => {
    setSearchBox(e.target.value);
  };

  return (
    <>
      <Box sx={{ mt: 18, mx: 3, minWidth: '100%' }}>
        <h1 className="text-xl">Companies</h1>
        <form noValidate autoComplete="off">
          <TextField
            variant='outlined'
            size='medium'
            label='Search'
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Search for a company"
            onChange={handleChange}
            fullWidth
          />
        </form>
      </Box>

      <Grid container spacing={2} justifyContent='center' sx={{ mt: 2 }}>
        {isLoading ? <div>Loading...</div> : companyList.map(
          ({ handle, name, description, numEmployees, logoUrl }) => (
            <Grid item key={handle} xs={12} sm={6} md={4}>
              <CompanyCard
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
    </>
  );
};

export default CompaniesList;
