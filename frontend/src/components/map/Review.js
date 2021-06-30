import React from 'react'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import LeaveComment from './LeaveComment';
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
            &nbsp;Reviews
            </Typography>
            <br/>
            {info.comments.map(e => 
                <>
                    <div>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {e.UserName[0]}
                            </Avatar>
                            }
                            title={e.UserName}
                            subheader={e.time}
                            style={{paddingTop:'0px'}}
                        />
                        <div style={{display:'block', paddingTop:'1px', paddingLeft:'25px',paddingBottom:'0px'}}>
                            <p style={{fontSize:'18px'}}>{e.comment}</p>
                        </div>
                    </div>        
                    <Divider variant="middle" className={classes.divider}/>
                </>
            )}
        </div>
    )
}

export default Review;