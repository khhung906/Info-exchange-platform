import React, {useState} from 'react'
function RegisterForm ({AdminUser, Change}){
    const [details, setDetails]=useState({name:"", email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        AdminUser(details)
        console.log(details)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <div>
                        <h2>Sign Up</h2>
                    </div>
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
                    <button className="switch-form" onClick={()=>Change()}>I already have an account</button>
                </div>
            </form>
        </div>
    )

}
export default RegisterForm