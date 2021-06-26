import React, {useState} from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddInfo from './AddInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LeaveComment from './LeaveComment';
import Review from './Review';

const useStyles = makeStyles((theme) => ({
    section1: {
      margin: theme.spacing(3, 2),
    },

    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
    section4: {
        margin: theme.spacing(3, 0, 2),
    },
    divider: {
        margin: theme.spacing(3, 0, 2),
    }
}));


function SideInfo (props) {
    //alert('side')
    const {info, setInfo, userinfo} = props;
    const changecolor = (change) => {
        
        console.log(change)
        if (change < 20) {
            return 'red';
        }
        else if (change >= 20 && change < 50) {
            return 'orange';
        }
        else {
            return 'green';
        }
    }

    const [openAdd1, setOpenAdd1] = useState(false);
    const handleClickOpenAdd1 = () => {
        setOpenAdd1(true);
    };
    const handleCloseAdd1 = () => {
        setOpenAdd1(false);
    };
    const [openAdd2, setOpenAdd2] = useState(false);
    const handleClickOpenAdd2 = () => {
        setOpenAdd2(true);
    };
    const handleCloseAdd2 = () => {
        setOpenAdd2(false);
    };

    const classes = useStyles();

    return (

        <div>
            {(info === null) ? "":
            <div className='sidenav'>
                <div className={classes.section1}>
                    <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4">
                            {(info === null) ? "":info.Name}
                        </Typography>
                    </Grid>
                    </Grid>
                    {(info === null) ? "": 
                        <Typography color="textSecondary" variant="body2">
                        {(info === null) ? "": info.Description}
                        </Typography>
                    }
                </div>
                <div className={classes.section4}>
                    {(info === null) ? "": <Divider variant="middle" className={classes.divider}/>}
                    <img className='sidenav-img' width={250} src={(info === null) ? "":info.image} />
                    {(info === null) ? "": <Divider variant="middle" className={classes.divider}/>}
                </div>
                <div className={classes.section2}>
                    {(info === null) ? "":
                        <Typography variant="body1">
                        Total Seats: {info.TotalSeats}
                        </Typography>
                    }   
                </div>
                <div className={classes.section2}>
                    <Typography variant="body1" style={{display:'inline-block'}}>
                    {(info === null) ? "": ("Seats Availablle:")}
                    </Typography>
                    <Typography variant="body1" style={{display:'inline-block', fontSize:'20px', paddingLeft: '30px', color: changecolor((info === null) ? "": info.Seats)}}>
                    {(info === null) ? "": info.Seats}
                    </Typography>
                </div>
                <div className={classes.section2}>
                    {(info === null) ? "":
                        <Typography variant="body1">
                        Open Hours: {info.OpenHours}
                        </Typography>
                    }   
                </div>
                <div className={classes.section3} style={{display:'inline-block'}}>
                    <AddInfo open={openAdd1} onClose={handleCloseAdd1} setInfo={setInfo} info={info}/>
                    {(info === null) ? "": <Button onClick={handleClickOpenAdd1} style={{display:'inline-block', backgroundColor: 'grey', color: '#FFFFFF'}}>Add Info</Button>}
                </div>
                <div className={classes.section3} style={{display:'inline-block'}}>
                    <LeaveComment open={openAdd2} onClose={handleCloseAdd2} setInfo={setInfo} info={info} userinfo={userinfo}/>
                    {(info === null) ? "": <Button onClick={handleClickOpenAdd2} style={{display:'inline-block', backgroundColor: 'grey', color: '#FFFFFF'}}>Leave Comment</Button>}
                </div>
                <Divider variant="middle" className={classes.divider}/>
                <div className={classes.section2}>
                    <Review info={info}/>
                </div>
            </div>
            }
        </div>
    )
}

export default SideInfo;