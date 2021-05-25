import React, {useState} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";


function Help() {
    console.log('help')
    return (
      <div>
        <div className="navBar">
          <NavLink className="title-name" to="/home">Info Exchange</NavLink>
          <NavLink className="redirect" to="/aboutus">About Us</NavLink>
          <NavLink className="redirect" to="/help">Help</NavLink>
        </div>
      </div>
    );
  }
  
  export default Help;
  