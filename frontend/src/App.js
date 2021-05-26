import React, {useState} from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import Help from './components/Help'
import MainPage from './components/MainPage';
import Calender from './components/Calender';

//language function undesigned
function App() {
  const [login, setLogin] = useState(false)
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
          <Route exact path="/" component={login? ()=><MainPage />: ()=><HomePage log_in = {log_in}/>} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/calender" component={Calender} />
          <Redirect from="/home" to="/" />
      </Switch>
    </div>
  );
}

export default App;
