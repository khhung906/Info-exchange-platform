import React, {useState} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  menu: {
      '& div': {
          width: '200px',
          height: '200px',
      }
  },
  submenu: {
    opacity: 0,
    visibility: 'hidden',
    display: 'block',
    position: 'absolute',
    left: 0,
    height: '40px',
    lineHeight: '40px',
    fontFamily: "Helvetica Neue",
    color: '#0E0500',
    padding: '10px',
  },
});






export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles()


  
  return (
    <div>
      <IconButton aria-haspopup="true" onClick={handleClick} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="profile"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
          <MenuItem className={classes.submenu} onClick={handleClose}>Profile</MenuItem>
          <MenuItem className={classes.submenu} onClick={handleClose}>My account</MenuItem>
          <MenuItem className={classes.submenu} onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}