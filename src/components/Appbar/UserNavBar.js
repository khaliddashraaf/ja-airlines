import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Icon from '../Icon/icon';
import red from '@material-ui/core/colors/red';

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
const alo = red[50];

export default function ElevateAppBar(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props} >
                <AppBar style={{ minHeight: '85px', backgroundColor: '#f2f2f2' }} >
                    <Toolbar>
                        <Box mt={1.5} ml={20} display='flex'>
                            <Icon sx={{}}></Icon>

                            <Typography variant='h3' sx={{ fontFamily: 'Monospace', ml: 3, color: '#111111' }}>
                                JA Airlines
                    </Typography>

                            <Button href={`/myProfile/${localStorage.getItem("CurrentUserID")}`} style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">View My Profile</Button>
                            <Button href={`/user-flights/${localStorage.getItem("CurrentUserID")}`} style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">View My Flights</Button>
                            <Button href='/UserSearch' style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">Book A Flight</Button>
                            {/* <Button href='/delete' style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">Delete</Button>
                            <Button href='/login' style={{ backgroundColor: '#f2f2f2', border: '1px solid #d2a600', borderRadius: '50px', color: '00435e', paddingInline: '30px', marginRight: '100px' }} variant="outlined">LOGIN</Button> */}


                        </Box>




                    </Toolbar>


                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
            </Container>
        </React.Fragment>
    );
}
