import React, {useState} from 'react'
import { fade,makeStyles } from '@material-ui/core/styles';
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
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
import SideBar from './SideBar.js'
import ProfileMenu from './ProfileMenu'
import Cards from './Cards'
import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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
    const topbarTitles = {mainpage: 'Main Page', calendar: 'Calendar'}
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
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <SideBar/>
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

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <IconButton className={classes.moneyButton} color="inherit">
                <AttachMoneyIcon />
                <ListItemText primary={'20'}/>
              </IconButton>

              <IconButton className={classes.notificationButton} color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {/* <ProfileMenu/> */}
            </Toolbar>
          </AppBar>
        </div>
    );
}
  
  export default MainPageTopBar;
