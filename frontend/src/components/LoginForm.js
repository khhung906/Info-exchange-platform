import React, {useState} from 'react'

function LoginForm({Login, error, Change}) {
    const [details, setDetails]=useState({email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        Login(details)
    }

    const FormStyle = () => {
        if(error === '' || error === 'register successfully'){
            return 'form-group';
        }
        else{
            return 'error-form form-group';
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <div className="form-title"> 
                    <h2>Sign In</h2>
                </div>
                {(error !=='')?(<div className='error'>{error}</div>):''}
                <div className={FormStyle()}>
                    <label htmlFor="email"></label>
                    <input type="text" name="email" id="email" placeholder="Email" onChange={e=>setDetails({...details, email:e.target.value})} value={details.email}/>
                </div>
                <div className={FormStyle()}>
                    <label htmlFor="password"></label>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={e=>setDetails({...details, password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="Login"/>
                <hr/>
                <button className="switch-form" onClick={()=>Change()}>Join Us</button>
            </div>
        </form>
    )
}
export default LoginForm 