import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import { Button, Paper } from '@mui/material';
import Icon from '../Icon/icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function ElevationScroll(props) {
  
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
  
export default function ElevateAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props} >
        <AppBar style={{ minHeight:'', backgroundColor:'#f2f2f2'}} >
          <Toolbar>
              <Paper elevation={0} mt={5} ml={50} display='flex' style={{backgroundColor:'inherit', display:'flex', flexDirection:'row', marginLeft:'160px'}}>
                    <Icon sx={{}}></Icon>

                  <Typography variant='h3' style={{fontFamily: 'montserrat', color:'#024059', marginLeft:'10px', fontWeight:'bold', userSelect:'none'}}>
                     JA Airlines
                    </Typography>   
                    <Button href='/update' style={{backgroundColor:'#f2f2f2', border:'1px solid #d2a600', borderRadius:'50px', color:'00435e', paddingInline:'30px', marginRight:'100px'}} variant="outlined">Update</Button>

                    <Button href='/CreateFlights' style={{backgroundColor:'#f2f2f2', border:'1px solid #d2a600', borderRadius:'50px', color:'00435e', paddingInline:'30px', marginRight:'100px'}} variant="outlined">Create</Button>
                    <Button href='/search' style={{backgroundColor:'#f2f2f2', border:'1px solid #d2a600', borderRadius:'50px', color:'00435e', paddingInline:'30px', marginRight:'100px'}} variant="outlined">Search</Button>
                    <Button href='/delete' style={{backgroundColor:'#f2f2f2', border:'1px solid #d2a600', borderRadius:'50px', color:'00435e', paddingInline:'30px', marginRight:'100px'}} variant="outlined">Delete</Button>
                     <Button href='/login' style={{backgroundColor:'#f2f2f2', border:'1px solid #d2a600', borderRadius:'50px', color:'00435e', paddingInline:'30px', marginRight:'100px'}} variant="outlined">LOGIN</Button>


                </Paper>
                {/* <div style={{marginLeft:'600px'}}>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{color:'#f2f2f2', backgroundColor:'#024059'}}
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Dashboard
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <MenuItem style={{width:'125px'}} onClick={handleClose}>Login</MenuItem>
                    <MenuItem onClick={handleClose}>Register</MenuItem> */}
{/*                     
                  </Menu>
              </div> */}

              


          </Toolbar>
          

        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
      </Container>
    </React.Fragment>
  );
}
