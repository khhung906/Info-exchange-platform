import React, {useState} from 'react'
import LoginForm from "./components/LoginForm"
import RegisterForm from './components/RegisterForm'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000'

const instance = axios.create({
  baseURL: API_ROOT,
})

function App() {
  const [guest, setGuest] = useState({email:'', password:''})
  const [error, setError] = useState('')
  const [FormType, setType] = useState('login')
  

  const Login = async(details) => {
    console.log(details)
    const password = details.password;
    const mail = details.email;
    const {
      data: { message, data}
    } = await instance.get('api/GetUserInfo', {
      mail, 
      password
    });
    console.log(message)
    //if fail
    //setError("Details do not match.")
  }

  const CreateAccount = () =>{
    //if fail
    //setError("Account already exist.")
  }

  // const [user, setUser]= useState=([{name:'', email:'', password:''}])


  const Logout = () => {
    console.log("Logout")
    setGuest({email:''})
  }

  const FormSwitch = () => {
    console.log('change-form');
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
        <a className="title-name">Info Exchange</a>
        <a className="redirect">About Us</a>
        <a className="redirect">Help</a>
        <a className="redirect">Language</a>
      </div>
      <hr className="bar-line"/>
      <div>
        <ul>
          <li className="title">
              <div>
                <h1 className="title-name">Where you find what you need?</h1>
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
                <RegisterForm CreateAccount={CreateAccount} Change={FormSwitch}/>))}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
