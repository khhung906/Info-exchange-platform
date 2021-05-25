import React, {useState} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

function AboutUs() {
  console.log('about us')
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

export default AboutUs;
