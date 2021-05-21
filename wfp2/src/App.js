import React, {useState} from 'react'
import LoginForm from "./components/LoginForm"
import RegisterForm from './components/RegisterForm'

function App() {
  const adminUser ={
    email: "123",
    password:"123"
  }
  const [user, setUser]=useState({name:'',email:''})
  const [error, setError]=useState('')
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
  const Logout = () => {
    console.log("Logout")
    setUser({name:'', email:''})
  }



  
  return (
    <div className="App">
      {(user.email != "")?(
        <div>
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ):(
        <LoginForm Login={Login} error={error}/>)}
    </div>
  );
}

export default App;
