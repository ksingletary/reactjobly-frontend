import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";

// Page for a single company
// Should have the company description and a list of jobs for this company
// should make an API call to

const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    // define the async function to fetch company data
    // console.log('use effect, handle is',handle)
    async function getCompany(handle) {
      let res = await JoblyApi.getCompany(handle);
      setCompany(res);
      setIsLoading(false)
    }
    setIsLoading(true)
    getCompany(handle);
  }, []);

  // expect a company's jobs array to look like
  // "jobs": [
  //     {
  //     "id": 7,
  //     "title": "Technical brewer",
  //     "salary": 157000,
  //     "equity": "0"
  //     },
  // ]

  return (
    <>
      <div className="m-6 p-4">
        {!company && <div> Let me get that for you....</div>}
        {!isLoading && (
          <div>
            <h1>{company.name || ""}</h1>
            <p className="p-6 max-w-xl">{company.description}</p>
            <div className="m-4 text-3xl">
              <h3>Jobs for {company.name}</h3>
            </div>
            <div>
              {company.jobs
                .filter(job => job.id && !isNaN(job.id))
                .map(({ id, title, salary, equity }) => (
                  <JobCard
                    key={id}
                    title={title}
                    salary={salary}
                    equity={equity}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
  
};

export default Company;