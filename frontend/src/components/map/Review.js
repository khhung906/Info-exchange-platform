import React, {useState} from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddInfo from './AddInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LeaveComment from './LeaveComment';

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function Review () {


    const classes = useStyles();

    return (
        <div>
            <Typography variant="body1">
                Reviews
            </Typography>
            <br/>
            <p style={{fontSize:'15px', fontFamily:'Roboto,Arial,sans-serif'}}>UserName1</p>
            <br/>
            <p style={{fontSize:'12px'}}>Very Good</p>
            <Divider variant="middle" className={classes.divider}/>
            <br/>
            <p style={{fontSize:'15px', fontFamily:'Roboto,Arial,sans-serif'}}>UserName2</p>
            <br/>
            <p style={{fontSize:'12px'}}>Very Bad</p>
            <Divider variant="middle" className={classes.divider}/>
        </div>
    )
}

export default Review;