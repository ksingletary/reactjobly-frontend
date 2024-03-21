import Button from '@mui/material/Button';

// Button for applying to jobs. Will be rendered on job cards.
// Depending on applied status, button may be disabled.
const ApplyButton = ({ applyToJob, hasApplied }) => {
  const handleSubmit = () => {
    // this will run applyToJob
    applyToJob();
  };
  //
  return (
    <>
      <Button variant="contained" onClick={handleSubmit} disabled={hasApplied}>
        {hasApplied ? "Applied" : "Apply Now"}
      </Button>
    </>
  );
};

export default ApplyButton;