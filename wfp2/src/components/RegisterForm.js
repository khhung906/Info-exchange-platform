import React, {useState} from 'react'
import LoginForm from './LoginForm'
function RegisterForm (AdminUser){
    const [details, setDetails]=useState({name:"", email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        AdminUser(details)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <div>
                        <h2>Sign Up</h2>
                        <button onClick={<LoginForm/>}>I already have an account</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" onChange={e=>setDetails({...details, name:e.target.value})} value={details.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" id="email" onChange={e=>setDetails({...details, email:e.target.value})} value={details.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" onChange={e=>setDetails({...details, password:e.target.value})} value={details.password}/>
                    </div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    )

}
export default RegisterForm