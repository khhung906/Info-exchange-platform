import React, {useState} from 'react'
import RegisterForm from './RegisterForm'
function LoginForm({Login, error}) {
    const [details, setDetails]=useState({name:"", email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        Login(details)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <div>
                    <h2>Sign in</h2>
                    <button onClick={<RegisterForm/>}>I don't have an account</button>
                </div>
                {(error !='')?(<div className='error'>{error}</div>):''}
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
    )
}
export default LoginForm 