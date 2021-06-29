import React, {useState, useEffect} from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from './components/mainpage/HomePage'
import AboutUs from './components/mainpage/AboutUs'
import MainPage from './components/mainpage/MainPage';
import Calender from './components/calender/Calender';
import Map from './components/map/Map';
import PastExams from './components/pastexam/PastExams'

const LOCALSTORAGE_USER = "";
const LOCALSTORAGE_LOGIN = false;

function App() {
  const savedUser = localStorage.getItem(LOCALSTORAGE_USER);
  const savedLogin = localStorage.getItem(LOCALSTORAGE_LOGIN);
  const [login, setLogin] = useState(false || savedLogin)
  const [userinfo, setUserinfo] = useState("" || savedUser);
  const log_in = (bool) =>{
    setLogin(bool);
  }

  useEffect(() => {     
    if (login) {       
      localStorage.setItem(LOCALSTORAGE_USER, userinfo);    
      localStorage.setItem(LOCALSTORAGE_LOGIN, login);
    }   
  }, [login, userinfo]);

  return (
    <div>
      {/* <div className="navBar">
        <NavLink className="title-name" to="/home">Info Exchange</NavLink>
        <NavLink className="redirect" to="/aboutus">About Us</NavLink>
        <NavLink className="redirect" to="/help">Help</NavLink>
      </div> */}
      <Switch>
          <Route exact path="/" component={login? ()=><MainPage userinfo={userinfo} log_in={log_in}/>: ()=><HomePage log_in = {log_in} setUserinfo={setUserinfo}/>} />
          <Route exact path="/aboutus" component={() => <AboutUs userinfo={userinfo}/>} />
          <Route exact path="/calendar" component={() => <Calender userinfo={userinfo} log_in={log_in}/>} />
          <Route exact path="/map" component={() => <Map userinfo={userinfo} log_in={log_in}/>} />
          <Route exact path="/pastexams" component={() => <PastExams userinfo={userinfo} log_in={log_in}/>} />
          <Redirect from="/home" to="/" />
      </Switch>
    </div>
  );
}

export default App;
