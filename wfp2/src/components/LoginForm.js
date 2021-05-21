import React, {useState} from 'react'
import RegisterForm from './RegisterForm'
function LoginForm({Login, error, Change}) {
    const [details, setDetails]=useState({name:"", email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        //Login(details)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <div>
                    <h2>Sign In</h2>
                </div>
                {(error !='')?(<div className='error'>{error}</div>):''}
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" name="name" id="name" placeholder="Name" onChange={e=>setDetails({...details, name:e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input type="text" name="email" id="email" placeholder="Email" onChange={e=>setDetails({...details, email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={e=>setDetails({...details, password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="Login"/>
                <button className="switch-form" onClick={()=>Change()}>I don't have an account</button>
            </div>
        </form>
    )
}
export default LoginForm 