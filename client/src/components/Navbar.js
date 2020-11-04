import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types'

//material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';


const styles = theme => ({
  navCenter:{
    margin: 'auto',
    textTransform: 'none'
  },
});

export class Navbar extends Component {
  render() {
    const img = <img style={{marginTop: 10}}src="https://unsplash.it/40/40"/>
    const {classes} = this.props;
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Grid>
            <Grid item direction="column">
            <div>{img}</div>
            </Grid>
            
            <Grid item direction="column" classname={classes.navCenter}>
            <Button color='inherit' component={Link} to='/'>Browse</Button>
            <Button color='inherit' component={Link} to='/createpost'>Sell</Button>
            </Grid>
            <Grid item classname="nav-right">
            <Button color='inherit' component={Link} to='/login'><Typography variant='button'>Login</Typography></Button>
            <Button color='inherit' component={Link} to='/signup'>Signup</Button>
            </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className="container">
        <Grid >
          <Grid item><Typography className="jumbotron-heading" color="secondary" variant="h2">Browse Your Local <br/>Organic Homegrown Extras</Typography></Grid>
        </Grid>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navbar);
