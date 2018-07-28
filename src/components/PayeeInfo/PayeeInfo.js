import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//importing components necessary for expansion panel (list of companies with hidden information)
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//importing components necesary for switching between Payee, Card and Invoice information
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//importing components necessary for text and layout
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//importing components necessary for icons
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

//styling
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: 'grey',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    [theme.breakpoints.down('sm')]: {
      padding:0,
      marginRight:0
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    '&:hover': {
      color: 'black',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'grey',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'grey',
    },
  },
  tabSelected: {},
  typography: {
    fontFamily:"'Montserrat', sans-serif"
  },
  typography2: {
    fontFamily:"'Montserrat', sans-serif",
    marginTop:10
  },
  bold:{
    fontWeight:"bold",
    color:"#447481",
    fontFamily:"'Montserrat', sans-serif",
    marginBottom:10
  },
  addressDetail:{
    fontFamily:"'Montserrat', sans-serif",
    position:"relative",
    left:25
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    color:"#447481"

  },
  panel:{
      backgroundColor:"#87868624"
  },
  column: {
    flexBasis: '50%',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
  icon:{
    position: "relative",
    color:"#447481",
    top: 5,
    right: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize:15,
    },
  },
  invoiceHolder:{
    display:"block",
  },
  cardI:{
    fontWeight:"bold",
    color:"#447481"
  },
  expansionPanel:{
    [theme.breakpoints.down('sm')]: {
      padding:0,
    },
  }
});

//building a PayeeInfo component (a structure for all the information about Payee, Card and Invoices, that will be passed in App.js)
class PayeeInfo extends React.Component {
  state = {
    value: 0, //value to keep a track what tab user is on ("Payee", "Card" or "Invoice")
  };

  //listening to any changes (switching between tabs)
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary classes={{root: classes.panel}} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {this.props.companyName}
              <Icon className={this.props.iconCSS}>notifications_active</Icon>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{root: classes.expansionPanel}}>
            {/* tabs for switching between "Payee", "Card" and "Invoice" info */}
            <Tabs
                value={value}
                onChange={this.handleChange}
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="Payee"
              />
              <Tab
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={"Card" + this.props.attentionSign}
              />
              <Tab
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="Invoice"
              />
            </Tabs>
          </ExpansionPanelDetails>

          {this.state.value === 0 ? //if this.state.value is 0, it means user is on "Payee" tab
            //when "Payee" tab open display futher information about company (contact, address..)
            <ExpansionPanelDetails>
              <Grid container direction="row"> 
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    {/* <div className={classes.column}> */}
                  <Typography className={classes.typography}>
                    <Tooltip title="contact name">
                        <Icon classes={{root:classes.icon}}>account_box</Icon>
                    </Tooltip>
                    {this.props.attention}
                  </Typography>
                  <Typography className={classes.typography}>
                      <Tooltip title="primary address">
                          <Icon classes={{root:classes.icon}}>home</Icon>
                      </Tooltip>
                      {this.props.street}
                  </Typography>
                  <Typography className={classes.addressDetail}>
                      {this.props.city}, {this.props.province}, {this.props.code}
                  </Typography>
                  <Typography className={classes.addressDetail}>
                      {this.props.country}
                  </Typography>
                </Grid>
                {/* </div> */}
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Typography className={classes.typography2}>Fax: {this.props.fax}</Typography>
                    <Typography className={classes.typography}>Phone: {this.props.phone}</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>

          // else if value is 1, it means "Card" tab is opened
          //in this case we display information about card
          : this.state.value === 1?
            <ExpansionPanelDetails className={classes.details}>
              <div className={classes.column}>
                <Typography className={classes.bold}>
                    Credit Card Information
                </Typography>
                <Typography className={classes.typography}>
                  <span className={classes.cardI}>PAN:</span> {this.props.pan}
                </Typography>
                <Typography className={classes.typography}>
                  <span className={classes.cardI}>CVV:</span> {this.props.cvv}
                </Typography>
                <Typography className={classes.typography}>
                  <span className={classes.cardI}>Exp:</span> {this.props.exp}
                </Typography>
                <Typography className={this.props.warningCSS}>
                  Card expires/expired {this.props.warningText}
                </Typography>
              </div>
            </ExpansionPanelDetails>

          : //in any other case (what leaves us with "Invoice"), display a holder for invoices
            //in App.js invoices are added to this holder using map method
            <ExpansionPanelDetails classes={{root:classes.invoiceHolder}}>
              {/* here we will insert all the invoices by mapping through the array */}
              {this.props.children} 
            </ExpansionPanelDetails>
          }
        </ExpansionPanel>
      </div>
    );
  }
}

PayeeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

//exporting PayeeInfo component
export default withStyles(styles)(PayeeInfo);








