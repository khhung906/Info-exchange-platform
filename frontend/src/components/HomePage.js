import React, {useState} from 'react'
import LoginForm from "./LoginForm"
import RegisterForm from './RegisterForm'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'

const API_ROOT = 'http://localhost:4000'

const instance = axios.create({
  baseURL: API_ROOT,
})

function HomePage({log_in, setUserinfo}) {
  const [guest, setGuest] = useState({email:'', password:''})
  const [error, setError] = useState('')
  const [FormType, setType] = useState('login')
  

  const Login = async(details) => {
    console.log(details)
    const password = details.password;
    const email = details.email;
    if (email.trim() === "" || password.trim() === "") {
      setError("You must enter a message");
      return;
    }
    const {
      data: {message, data}
    } = await instance.get('api/GetUserInfo', {
      params : {password, email} //password : password, mail : mail
    });
    setError(message)
    if(message === 'login successfully'){
        setUserinfo(email);
        log_in();
    }
  }

  const CreateAccount = async(details) =>{
    console.log(details)
    const name = details.name;
    const email = details.email;
    const password = details.password;
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      setError("You must enter a message");
      return;
    }
    const {
      data : {message}
    } = await instance.post('api/CreateUser', {
      name,
      email,
      password
    });
    if(message !== 'Account exists'){
      FormSwitch()
    }
    setError(message)
  }


  const Logout = () => {
    console.log("Logout")
    setGuest({email:''})
  }

  const FormSwitch = () => {
    console.log('change-form');
    setError('')
    if(FormType === 'login'){
      setType('register')
    }
    else{
      setType('login')
    }
  }

  return (
    <div>
      <div className="navBar">
        <NavLink style={{fontFamily: "copperplate", float: 'left'}} to="/home">Info Exchange</NavLink>
        <NavLink className="redirect" to="/aboutus">About Us</NavLink>
        <NavLink className="redirect" to="/help">Help</NavLink>
      </div>
      <hr className="bar-line"/>
        <ul>
            <li className="title">
                <div>
                <h1>
                  <div className="title-name" id="title-name1">Where </div>
                  <div className="title-name" id="title-name2">you </div>
                  <div className="title-name" id="title-name3">find </div>
                  <div className="title-name" id="title-name4">what </div>
                  <div className="title-name" id="title-name5">you </div>
                  <div className="title-name" id="title-name6">need?</div>
                </h1>
                <p className="title-context">use some dynamic design here</p>
                <p className="title-context"></p>
                <p className="title-context"></p>
                <p className="title-context"></p>
                <p className="rights">@2021 NTU All Rigts Reserved.</p>
                </div>
            </li>
            <li className="App">
            {(guest.email !== "")?(
                <div>
                <h1>Welcome</h1>
                <button onClick={Logout}>Logout</button>
                </div>
            ):(
                (FormType === "login")?(<LoginForm Login={Login} error={error} Change={FormSwitch}/>):(
                <RegisterForm CreateAccount={CreateAccount} error={error} Change={FormSwitch}/>))}
            </li>
        </ul>
    </div>
  );
}

export default HomePage;
