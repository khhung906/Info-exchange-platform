import React from 'react'
import { NavLink } from "react-router-dom";


function Help() {
    console.log('help')
    return (
      <div>
        <div className="navBar">
          <NavLink style={{fontFamily: "copperplate", float: 'left'}} to="/home">Info Exchange</NavLink>
          <NavLink className="redirect" to="/aboutus">About Us</NavLink>
          <NavLink className="redirect" to="/help">Help</NavLink>
        </div>
      </div>
    );
  }
  
  export default Help;
  