import React, {useState, useEffect} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import Help from './components/Help'
import MainPage from './components/MainPage';
import Calender from './components/calender/Calender';
import Map from './components/map/Map'

//language function undesigned
const LOCALSTORAGE_USER = "";
const LOCALSTORAGE_LOGIN = false;

function App() {
  const savedUser = localStorage.getItem(LOCALSTORAGE_USER);
  const savedLogin = localStorage.getItem(LOCALSTORAGE_LOGIN);
  const [login, setLogin] = useState(false || LOCALSTORAGE_LOGIN)
  const [userinfo, setUserinfo] = useState("" || LOCALSTORAGE_USER);
  const log_in = (bool) =>{
    setLogin(bool);
  }

  useEffect(() => {     
    if (login) {       
      localStorage.setItem(LOCALSTORAGE_USER, userinfo);    
      localStorage.setItem(LOCALSTORAGE_LOGIN, login);
    }   
  }, [login]);

  return (
    <div>
      {/* <div className="navBar">
        <NavLink className="title-name" to="/home">Info Exchange</NavLink>
        <NavLink className="redirect" to="/aboutus">About Us</NavLink>
        <NavLink className="redirect" to="/help">Help</NavLink>
      </div> */}
      <Switch>
          <Route exact path="/" component={login? ()=><MainPage userinfo={userinfo} log_in = {log_in}/>: ()=><HomePage log_in = {log_in} setUserinfo={setUserinfo}/>} />
          <Route exact path="/help" component={() => <Help userinfo={userinfo}/>}/>
          <Route exact path="/aboutus" component={() => <AboutUs userinfo={userinfo}/>} />
          <Route exact path="/calender" component={() => <Calender userinfo={userinfo} log_in = {log_in}/>} />
          <Route exact path="/map" component={() => <Map userinfo={userinfo} log_in = {log_in}/>} />
          <Redirect from="/home" to="/" />
      </Switch>
    </div>
  );
}

export default App;
