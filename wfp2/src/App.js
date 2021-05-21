import React, {useState} from 'react'
import LoginForm from "./components/LoginForm"
import RegisterForm from './components/RegisterForm'

function App() {
  const adminUser ={
    email: "123",
    password:"123"
  }
  const [user, setUser] = useState({name:'',email:''})
  const [error, setError] = useState('')
  const [FormType, setType] = useState('login')

  const Login = details => {
    console.log(details);
    if (details.email==adminUser.email && details.password==adminUser.password){
      console.log("Logged in")
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Details do not match.")
      setError("Details do not match.")
    }
  }

  const AdminUser = () =>{

  }

  const Logout = () => {
    console.log("Logout")
    setUser({name:'', email:''})
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
    <ul>
      <li className="title">
          <h1>Info Exchange</h1>
      </li>
      <li className="App">
        {(user.email != "")?(
          <div>
            <h2>Welcome, <span>{user.name}</span></h2>
            <button onClick={Logout}>Logout</button>
          </div>
        ):(
          (FormType === "login")?(<LoginForm Login={Login} error={error} Change={FormSwitch}/>):(
            <RegisterForm AdminUser={AdminUser} Change={FormSwitch}/>))}
      </li>
    </ul>
  );
}

export default App;
