import React, {useState} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import Help from './components/Help'
import MainPage from './components/MainPage';
import Calender from './components/calender/Calender';

//language function undesigned
function App() {
  const [login, setLogin] = useState(false)
  const [userinfo, setUserinfo] = useState("");
  const log_in = () =>{
    setLogin(true);
  }
  return (
    <div>
      {/* <div className="navBar">
        <NavLink className="title-name" to="/home">Info Exchange</NavLink>
        <NavLink className="redirect" to="/aboutus">About Us</NavLink>
        <NavLink className="redirect" to="/help">Help</NavLink>
      </div> */}
      <Switch>
          <Route exact path="/" component={login? ()=><MainPage userinfo={userinfo}/>: ()=><HomePage log_in = {log_in}  setUserinfo={setUserinfo}/>} />
          <Route exact path="/help" component={() => <Help userinfo={userinfo}/>}/>
          <Route exact path="/aboutus" component={() => <AboutUs userinfo={userinfo}/>} />
          <Route exact path="/calender" component={() => <Calender userinfo={userinfo}/>} />
          <Redirect from="/home" to="/" />
      </Switch>
    </div>
  );
}

export default App;
