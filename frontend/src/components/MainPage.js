import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "5px",
  },
  title: {
    flexGrow: 1,
    fontFamily: "copperplate",
  },
  notificationButton: {
    marginRight: "10px",
  },
  list: {
    width:250,
  },
  fullList: {
    width: 'auto',
  },
  feature_selection: {
    display: 'flex',
    flexWrap: 'wrap', '& >*': {margin: theme.spacing(1), width: theme.spacing(30), height: theme.spacing(30),},
  },
  moneyButton: {
    marginRight: "10px",
  },
  media: {
    height:140,
  }
}));

function MainPage() {
    console.log('main page')
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = e => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [state, setState]=useState({left:false})
    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
        return;
      }
        setState({...state, [anchor]:open})
    }
    
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['anything', 'anything2', 'anything3', 'anything4'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    return (
      <div>
        <div style={{ background: '#f7f3f3' }}>
          <AppBar position="static" style={{ background: 'gray' }}>
            <Toolbar>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer(anchor, true)} aria-haspopup="true">
                    <MenuIcon/>
                  </IconButton>
                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
              <Typography variant="h6" className={classes.title}>
                Main Page
              </Typography>

              <IconButton className={classes.moneyButton} color="inherit">
                <AttachMoneyIcon />
                <ListItemText primary={'20'}/>
              </IconButton>

              <IconButton className={classes.notificationButton} color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-controls="profile" aria-haspopup="true" onClick={handleClick} color="inherit">
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Menu style={{marginTop:'50px'}} id="profile" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <div className={classes.feature_selection}>
          <Card>
            <CardActionArea>
              <CardMedia className={classes.media} image="/AppImg/Calender.jpg"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Exam/HW Calender
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> 
        </div>
      </div>
    );
}
  
  export default MainPage;
