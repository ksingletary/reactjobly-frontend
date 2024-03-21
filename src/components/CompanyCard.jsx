import {
    Card,
    Button,
    Box,
    CardContent,
    Typography,
    CardMedia,
    CardActions,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  
  const CompanyCard = ({ handle, name, description, numEmployees }) => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/companies/${handle}`);
    };
  
    return (
      <Box margin='auto' sx={{width:'300px'}}>
        <Card sx={{maxHeight:'500', width:'300px'}}>
          <CardContent>
            <CardMedia
              component="img"
              height="140px"
              image="https://source.unsplash.com/random"
              alt="random image from unsplash"
            ></CardMedia>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {numEmployees} 
            </Typography>
            <Typography gutterBottom variant="body">
              {description} 
            </Typography>
  
          </CardContent>
            <Button size='small' variant="contained" onClick={handleClick}>See Jobs</Button>
          <CardActions>
  
          </CardActions>
        </Card>
      </Box>
    );
  };
  
  export default CompanyCard;