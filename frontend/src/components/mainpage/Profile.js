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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ClassIcon from '@material-ui/icons/Class';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import Button from '@material-ui/core/Button';
import instance from '../../axios';

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
  const {userinfo, set_icon, src} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSub, setSub] = useState(false);
  const [subscriptions, setSubscription] = useState([])

  useEffect(()=>{
    const loadUserData = async() => {
      const email = userinfo;
      const {
        data : {data}
      } = await instance.post('api/getUserData', {
        email
      })
      setSubscription(data);
    }
    loadUserData()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const change_icon = (animal) =>{
    set_icon(animal)
    //api connect
    saveicon(animal);
    handleClose();
  }

  const saveicon = async(animal) => {
    const email = userinfo;
    const icon = animal;
    const {
      data : {message} //newinfo
    } = await instance.post('api/updateIcon', {
      email, icon
    }) ;
  }

  const handleSubOpen = () => {
    setSub(true)
  }

  const handleSubClose = () => {
    setSub(false);
  };

  const deleteSub = async(sub) =>{
    console.log(userinfo, sub)
    let idx, name;
    // if (sub.indexOf('(') !== -1 && sub.indexOf('-') === -1){
    //   idx = sub.indexOf('(');
    //   name = sub.slice(0, idx);
    // }
    // else {
    name = sub;
    // }
    const email = userinfo;
    const {
      data : {message} //newinfo
    } = await instance.post('api/deleteCourseArray', {
      email, name
    }) ;
    console.log(message)
    let newsub = [...subscriptions];
    let idx_ = newsub.indexOf(name);
    newsub.splice(idx_,1);
    // console.log(newsub)
    setSubscription(newsub);
  }

  return (
      <div style={{paddingTop:'0px'}}>
      <div style={{display:'inline-block', paddingLeft:'30px', paddingTop:'0px'}}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<SmallAvatar alt="Remy Sharp" onClick={handleClickOpen} style={{cursor:'pointer'}}>+</SmallAvatar>}
        >
          <Avatar alt="Travis Howard" src={src} className={classes.large} />
        </Badge>
        <div style = {{float:"right", marginTop:"15px"}}>
          <Typography variant="h6">{userinfo}</Typography>
        </div>
        <br/><br/>
        <div onClick={handleSubOpen}>
          <Typography color='primary' style={{cursor:'pointer'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See my subsciptions</Typography>
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
                <ClassIcon color='secondary'/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={sub} />
            <Button onClick={() => (deleteSub(sub))}>
              <DeleteOutlineTwoToneIcon/>
            </Button>
          </ListItem>
          ))}
          </List>
        </div>
      </Dialog>
      
    </div>
  );
}
  
  export default Profile;