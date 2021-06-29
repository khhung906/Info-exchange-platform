import React, {useState, useEffect} from 'react'
import { fade,makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from '../mainpage/SideBar'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from '@material-ui/icons/GitHub';
import instance from '../../axios';
import flamingo from '../img/profileAvatar/flamingo.png';
import fish from '../img/profileAvatar/fish.png';
import toucan from '../img/profileAvatar/toucan.png';
import shrimp from '../img/profileAvatar/shrimp.png';
import hippo from '../img/profileAvatar/hippo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "5px",
  },
  title: {
    flexGrow: 1,
    color: 'white',
    fontFamily: "copperplate",
    textDecoration: 'none',
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
    flexWrap: 'wrap', '& >*': {margin: theme.spacing(3), width: theme.spacing(38), height: theme.spacing(42)},
  },
  moneyButton: {
    marginRight: "10px",
  },
  media: {
    height:140,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function MainPageTopBar(props) {
    const {log_in, userinfo} = props
    const classes = useStyles();
    const [state, setState]=useState({left:false})
    const [src, setSrc] = useState();

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

    useEffect(()=>{
        const loadUserData = async() => {
          const email = userinfo;
          const {
            data : {data, message, icon}
          } = await instance.post('api/getUserData', {
            email
          })
          set_icon(icon);
        }
        loadUserData()
    }, [])
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
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <SideBar log_in={log_in} userinfo={userinfo} src={src} set_icon={set_icon}/>
      </div>
    )

    return (
        <div>
          <AppBar position="static" style={{ background: 'DarkTurquoise' }}>
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
                <NavLink className={classes.title} to="/">Info Exchange</NavLink>
              </Typography>
              {/* <IconButton className={classes.notificationButton} color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <NavLink className="redirect" to="/aboutus" style={{color:'white', textDecoration:'none', fontFamily:"copperplate"}}>About Us</NavLink>
              &nbsp;&nbsp;&nbsp;
              <IconButton color="inherit">
                <a href={'https://github.com/johnsonhung906/Info-exchange-platform'} className="git-link" style={{color:'white'}}><GitHubIcon/></a>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
    );
}
  
  export default MainPageTopBar;
