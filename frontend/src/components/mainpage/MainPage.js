import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Cards from './Cards'
import MainPageTopBar from './MainPageTopBar'
import HashLoader from 'react-spinners/HashLoader'
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import flamingo from '../img/profileAvatar/flamingo.png';
import fish from '../img/profileAvatar/fish.png';
import toucan from '../img/profileAvatar/toucan.png';
import shrimp from '../img/profileAvatar/shrimp.png';
import hippo from '../img/profileAvatar/hippo.png';

const useStyles = makeStyles((theme) => ({
  feature_selection: {
    display: 'flex',
    backgroundColor:"#f7f3f3",
    minHeight:'80vh',
    flexWrap: 'wrap', '& >*': {margin: theme.spacing(5), width: theme.spacing(38), height: theme.spacing(42)},
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 30,
    height: 30,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);


function MainPage({log_in}) {
    const classes = useStyles();

    const [loading, setLoading] = useState(true)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        const loadData = async () => {
          await new Promise((r) => setTimeout(r, 2000))
          setLoading((loading) => !loading)
        }
        loadData()
    }, [])

    if (loading) {
        return (
          <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <HashLoader size={100}/>
          </div>
        )
    }

    else {
      return (
        <div className={classes.background}>
          <MainPageTopBar log_in={log_in}/>
          <div className='background' style={{paddingTop:'40px'}}>
            <div style={{display:'inline-block', paddingLeft:'100px'}}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp" className='changeAvatar' onClick={handleClickOpen}>+</SmallAvatar>}
              >
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" className={classes.large} />
              </Badge>
            </div>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="200px"
            >
              <DialogTitle id="alert-dialog-title">{"Pick Your Icon"}</DialogTitle>
              <DialogContent>
                <div style={{display:'inline-block', cursor:'pointer'}}>
                  <Avatar alt="Travis Howard" src={flamingo} className={classes.large} style={{background:'lightgreen'}}/>
                </div>
                <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}}>
                  <Avatar alt="Travis Howard" src={fish} className={classes.large} style={{background:'lightblue'}}/>
                </div>
                <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}}>
                  <Avatar alt="Travis Howard" src={toucan} className={classes.large} style={{background:'blue'}}/>
                </div>
                <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}}>
                  <Avatar alt="Travis Howard" src={shrimp} className={classes.large} style={{background:'orange'}}/>
                </div>
                <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}}>
                  <Avatar alt="Travis Howard" src={hippo} className={classes.large} style={{background:'red'}}/>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Typography gutterBottom variant="h4" style={{display:'inline-block', paddingLeft:'100px'}}>
              User name 
            </Typography>
          </div>
          <div className={classes.feature_selection}>
            <Cards/>
          </div>
        </div>

      );
    }
}
  
  export default MainPage;
