import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import flamingo from '../img/profileAvatar/flamingo.png';
import fish from '../img/profileAvatar/fish.png';
import toucan from '../img/profileAvatar/toucan.png';
import shrimp from '../img/profileAvatar/shrimp.png';
import hippo from '../img/profileAvatar/hippo.png';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
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


function Profile(props) {
  const {userinfo} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSub, setSub] = useState(false);
  const [src, setSrc] = useState(toucan);
  const [subscriptions, setSubscription] = useState(['NTU WVS', 'DSA'])
  
  useEffect(()=>{
    //load subscriptions
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const set_icon = (animal) =>{
    switch(animal){
      case 'flamingo':
        setSrc(flamingo)
        break;
      case 'fish':
        setSrc(fish)
        break;
      case 'toucan':
        setSrc(toucan)
        break;
      case 'shrimp':
        setSrc(shrimp)
        break;
      case 'hippo':
        setSrc(hippo)
        break;
    }
  }

  const change_icon = (animal) =>{
    set_icon(animal)
    //api connect
    handleClose();
  }

  const handleSubOpen = () => {
    setSub(true)
  }

  const handleSubClose = () => {
    setSub(false);
  };
    
  return (
      <div style={{paddingTop:'0px'}}>
      <div style={{display:'inline-block', paddingLeft:'30px', paddingTop:'0px'}}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<SmallAvatar alt="Remy Sharp" onClick={handleClickOpen}>+</SmallAvatar>}
        >
          <Avatar alt="Travis Howard" src={src} className={classes.large} />
        </Badge>
        <div style = {{float:"right", marginTop:"15px"}}>
          <Typography variant="h6">{userinfo}</Typography>
        </div>
        <br/><br/>
        <div onClick={handleSubOpen}>
          <Typography color='primary'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See my subsciptions</Typography>
        </div>
      </div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{"Pick Your Icon"}</DialogTitle>
        <DialogContent>
          <div style={{display:'inline-block', cursor:'pointer'}} onClick={() => change_icon('flamingo')}>
            <Avatar alt="Travis Howard" src={flamingo} className={classes.large} style={{background:'lightgreen'}}/>
          </div>
          <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}} onClick={() => change_icon('fish')}>
            <Avatar alt="Travis Howard" src={fish} className={classes.large} style={{background:'lightblue'}}/>
          </div>
          <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}} onClick={() => change_icon('toucan')}>
            <Avatar alt="Travis Howard" src={toucan} className={classes.large} style={{background:'blue'}}/>
          </div>
          <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}} onClick={() => change_icon('shrimp')}>
            <Avatar alt="Travis Howard" src={shrimp} className={classes.large} style={{background:'orange'}}/>
          </div>
          <div style={{display:'inline-block', paddingLeft:'50px', cursor:'pointer'}} onClick={() => change_icon('hippo')}>
            <Avatar alt="Travis Howard" src={hippo} className={classes.large} style={{background:'red'}}/>
          </div>
        </DialogContent>
        
      </Dialog>
      
      <Dialog
        open={openSub}
        onClose={handleSubClose}
        aria-labelledby="alert-dialog-title"
        maxWidth="sm"
      >
        <div style={{height: "600px"}}>
        <DialogTitle id="alert-dialog-title">{"Your Subscriptions"}</DialogTitle>
          <List>
          {subscriptions.map((sub, id) => (
            <ListItem button key={id}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={sub} />
          </ListItem>
          ))}
          </List>
        </div>
      </Dialog>
      
    </div>
  );
}
  
  export default Profile;