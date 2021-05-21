import React, {useState} from 'react'
import LoginForm from "./components/LoginForm"
import RegisterForm from './components/RegisterForm'

function App() {
  const adminUser ={
    email: "123",
    password:"123"
  }
  const [guest, setGuest] = useState({email:'', password:''})
  const [error, setError] = useState('')
  const [FormType, setType] = useState('login')

  const Login = details => {
    console.log(details);
    if (details.email==adminUser.email && details.password==adminUser.password){
      console.log("Logged in")
      setGuest({
        email: details.email,
        password: details.password
      })
    } else {
      console.log("Details do not match.")
      setError("Details do not match.")
    }
  }

  const AdminUser = () =>{
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
        <a className="redirect">Language</a>
      </div>
      <div>
        <ul>
          <li className="title">
              <div>
                <h1 className="title-name">Where you find what you need?</h1>
                <p className="rights">@2021 NTU All Rigts Reserved.</p>
              </div>
          </li>
          <li className="App">
            {(guest.email != "")?(
              <div>
                <h1>Welcome</h1>
                <button onClick={Logout}>Logout</button>
              </div>
            ):(
              (FormType === "login")?(<LoginForm Login={Login} error={error} Change={FormSwitch}/>):(
                <RegisterForm AdminUser={AdminUser} Change={FormSwitch}/>))}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
