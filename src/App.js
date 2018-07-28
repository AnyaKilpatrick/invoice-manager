import React from 'react';
import { withStyles } from '@material-ui/core/styles';

//importing components for text and layout
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//importing json object
import Data from "./sample.json";

//importing built components
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import PayeeInfo from "./components/PayeeInfo";

//importing moment.js
import Moment from "moment";

//styling
const styles = theme => ({
  mainDiv:{
    marginTop:40,
    maxWidth: "100%",
    marginBottom:40
  },
  column: {
    flexBasis: '80%',
  },
  invoiceCard:{
    background: "#2e094c14",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft:0,
      marginRight:0
    },
  },
  typography: {
    fontFamily:"'Montserrat', sans-serif"
  },
  list:{
    fontWeight: "bold",
    color:"#447481",
  },
  redIcon:{
    color: "#864f8e",
    fontSize: 18,
    marginLeft:10
  },
  expSoon:{
    color:"grey"
  },
  hiddenIcon:{
    display:"none"
  },
  warningCSS:{
    background: "#7f2e854a",
    padding: 10,
    marginTop: 5,
    borderRadius: 5
  },
  hiddenWarning:{
    display:"none"
  },
  companyList: {
    marginLeft:15
  }
})

//putting together all built components and passing the data from json file
class App extends React.Component {
  state= {
    data:Data,
    filter: "" //value that is passed to "filter" method. it's changing dynamically when input is changed
  }

  //listen to any changes in search bar, and update "filter" state
  handleChange = (event) => {
    const input = event.target.value.trim().toUpperCase();
    
    this.setState({filter: input}, ()=>{
      console.log(this.state.filter);
    })
  }

  render() {
    const { classes } = this.props;
    // const now = Moment();

    return (
      <div className="App">
        <Navbar/>
        <Grid container direction="row" alignItems="center" justify="center" spacing={24} className={classes.mainDiv}>
          <Grid item xs={12} sm={12} md={8} lg={7} xl={7}>
            <SearchBar
              inputValue = {this.state.filter}
              handleChange = {this.handleChange}
            />
          </Grid>
          {this.state.data
            //sorting array of object in alphabetic order based on Company name
            .sort(function(a, b){
            var textA = a.Payee.Name.toLowerCase();
            var textB = b.Payee.Name.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            //grabbing search bar input to filter company list
            .filter((data)=> data.Payee.Name.startsWith(this.state.filter))
            //mapping through the array
            .map((data, index)=>
            <Grid key={index} item xs={12} sm={12} md={8} lg={7} xl={7} className={classes.companyList}>
              <PayeeInfo
                //styling notification icon
                //if current date is passed expiration date, use redIcon class for styling, otherwise hide it
                iconCSS={Moment(data.Payment.Exp, "M-YYYY") < Moment().add(30, "days")? 
                  classes.redIcon : classes.hiddenIcon
                }
                //if current date is passed expiration date, add exclamation mark to tab "card" to drag attention
                attentionSign = {Moment(data.Payment.Exp, "M-YYYY") < Moment().add(30, "days")? 
                  " !" : ""
                }
                 //if current date is passed expiration date, use warningCSS class for styling, otherwise hide warning
                warningCSS = {
                  Moment(data.Payment.Exp, "M-YYYY") < Moment().add(30, "days")? 
                  classes.warningCSS: classes.hiddenWarning
                }
                //show the difference between exp. date and current date/time
                warningText = {
                  Moment(data.Payment.Exp, "M-YYYY").fromNow()
                }
                //passing all info from json file 
                companyName={data.Payee.Name}
                fax={data.Payee.Fax}
                phone={data.Payee.Phone}
                street={data.Payee.Address.Address1}
                city={data.Payee.Address.City}
                province={data.Payee.Address.StateOrProvince}
                code={data.Payee.Address.PostalCode}
                country={data.Payee.Address.Country}
                attention={data.Payee.Attention}
                cvv={data.Payment.CVV}
                pan={data.Payment.PAN}
                exp={data.Payment.Exp}
                submissionDate={data.Payee.SubmissionDate}
              >
                {/* mapping through the array of invoices */}
                {/* passing it to PayeeInfo component as a child */}
                {data.Remittance.map((invoice, index)=>
                  <div key={index} className={classes.invoiceCard}>
                    <Typography className={classes.typography}>
                      <span className={classes.list}>Payer Name:</span> {invoice.PayorName}
                    </Typography>
                    <Typography className={classes.typography}>
                      <span className={classes.list}>Payer Id:</span> {invoice.PayorId}
                    </Typography>
                    <Typography className={classes.typography}>
                      <span className={classes.list}>Invoice Number:</span> {invoice.InvoiceNo}
                    </Typography>
                    <Typography className={classes.typography}>
                      <span className={classes.list}>Description:</span> {invoice.Description}
                    </Typography>
                    <Typography className={classes.typography}>
                      <span className={classes.list}>Amount:</span> {invoice.Amount}
                    </Typography>
                  </div>
                )}
              </PayeeInfo>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

// exporting App component with styles
export default withStyles(styles)(App);
