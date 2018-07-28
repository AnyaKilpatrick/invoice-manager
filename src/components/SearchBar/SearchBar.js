import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//importing components
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

//styling
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        fontFamily:"'Montserrat', sans-serif",
        '&$cssFocused': {
            color: "#86518e",
            fontFamily:"'Montserrat', sans-serif"
        }
    },
    input: {
        width:250
    },
    cssFocused: {},
    cssUnderline: {
    '&:after': {
        borderBottomColor: "#86518e",
    }}
});

//building SearchBar component
function SearchBar(props) {
    const { classes } = props;

    return (
        <FormControl className={classes.margin}>

            <InputLabel
                FormLabelClasses={{
                    root: classes.cssLabel, //customizing fontFamily and color
                    focused: classes.cssFocused,
                }}
                htmlFor="name"
            >
                Search by a company name
            </InputLabel>

            <Input
                classes={{
                    underline: classes.cssUnderline, //customizig input and underline style
                    root: classes.input
                }}
                id="name"
                value={props.inputValue}
                onChange={props.handleChange}
                autoComplete="off" //turn off browser autocomplete
            />
        </FormControl>
    )
};

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

//exporting SearchBar component with styles
export default withStyles(styles)(SearchBar);