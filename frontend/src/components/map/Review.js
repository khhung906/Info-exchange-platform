import React, {useState} from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddInfo from './AddInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LeaveComment from './LeaveComment';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: theme.spacing(3, 0, 2),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

function Review (props) {
    const {info} = props;

    const classes = useStyles();

    return (
        <div>
            <Typography variant="body1">
                Reviews
            </Typography>
            <br/>
            {info.comments.map(e => 
                <>
                    <div>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                            }
                            title={e.UserName}
                            subheader="September 14, 2016"
                        />
                        <div style={{display:'block', paddingTop:'5px', paddingLeft:'20px'}}>
                            <p style={{fontSize:'13px'}}>{e.comment}</p>
                        </div>
                    </div>        
                    <Divider variant="middle" className={classes.divider}/>
                </>
            )}
        </div>
    )
}

export default Review;