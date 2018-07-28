import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//importing components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//styling
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    fontFamily:"'Montserrat', sans-serif",
    fontWeight:"bold",
    textAlign:"right"
  },
  appBar:{
      background: 'linear-gradient(45deg, #c38ab9 30%, #86518e 90%)',
  }
};
//building Navbar component (stateless)
function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}> 
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            invoice-manager
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting
export default withStyles(styles)(Navbar);