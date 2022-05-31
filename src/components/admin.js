import {Grid, Typography} from '@material-ui/core';
import { Box } from '@mui/system';
import ElevateAppBar from './Appbar/appbar'
import backgd from './images/backgd.jpeg';
import { Paper , Button , ButtonGroup } from '@mui/material';

// import Form from './Form/Form';

const Admin = () => {
  const styles = {
    paperContainer: {
        backgroundImage: `url(${backgd})`,
        backgroundSize:'cover',
        height: '700px',
        display:'block',
        width: '100%'
    }
};


  return (
    <div style={{width:'100%', backgroundColor:'#f2f2f2'}}>
      <ElevateAppBar/>
      <Paper style={styles.paperContainer}>
        <Box sx={{pt:'400px', pl:'750px', textAlign:'right', fontFamily:'monospace'}} display='inline-grid' alignItems='center'>
        <Typography variant='h4' style={{fontFamily:'monospace', color:'#ffffff'}}>
          around the world
        </Typography>
        <Typography variant='h1' style={{fontFamily:'monospace', color:'#ffffff'}}>
          JA AIRLINES 
        </Typography>
        </Box>

    </Paper>
    <Box>

    </Box>
    <Grid container direction="column" style={{width:'30%', display:'flexbox', margin:'auto', backgroundColor:'#f1c50e', marginTop:'-90px', alignItems:'center'}}>

            <Button style={{marginTop:'20px', marginBottom:'20px', width:'40%'}} variant='outlined' href='/flights'>Show Flights</Button>
            <Button style={{marginBottom:'20px', width:'40%'}} variant='outlined' href='/search'>Search Flights</Button>
            <Button style={{marginBottom:'20px', width:'40%'}} variant='outlined' href='/CreateFlights'>Create Flight</Button>
            <Button style={{marginBottom:'20px', width:'40%'}} variant='outlined' href='/delete'>Delete Flight</Button>
            <Button style={{marginBottom:'20px', width:'40%'}} variant='outlined' href='/update'>Update Flight</Button>
            <Button style={{marginBottom:'20px', width:'40%'}} variant='outlined'onClick={() => {localStorage.setItem("isAuthenticated", "false");
            window.location.pathname = '/'}}>Logout</Button>

   </Grid>
    </div>
  );
};

export default Admin;
