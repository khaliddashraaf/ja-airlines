import {Typography} from '@material-ui/core';
import { Box } from '@mui/system';
 import ElevateAppBar from './Appbar/UserNavBar'
import backgd from './images/backgd.jpeg';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

// import Form from './Form/Form';

const Home = () => {
  const styles = {
    paperContainer: {
        backgroundImage: `url(${backgd})`,
        backgroundSize:'cover',
        height: '700px',
        display:'block',
        width: '100%'
    }
}


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

    </div>
  );
};

export default Home;
