import React, {useState} from 'react'

function RegisterForm ({CreateAccount, error, Change}){
    const [details, setDetails]=useState({name:'', email:'',password:''})
    const submitHandler=e=>{
        e.preventDefault()
        CreateAccount(details)
        console.log(details)
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
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <div className="form-title">
                        <h2>Sign Up</h2>
                    </div>
                    {(error !== '')?(<div className='error'>{error}</div>):''}
                    <div className={FormStyle()}>
                        <label htmlFor="name"></label>
                        <input type="text" name="name" id="name" placeholder="Name" onChange={e=>setDetails({...details, name:e.target.value})} value={details.name}/>
                    </div>
                    <div className={FormStyle()}>
                        <label htmlFor="email"></label>
                        <input type="text" name="email" id="email" placeholder="Email" onChange={e=>setDetails({...details, email:e.target.value})} value={details.email}/>
                    </div>
                    <div className={FormStyle()}>
                        <label htmlFor="password"></label>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={e=>setDetails({...details, password:e.target.value})} value={details.password}/>
                    </div>
                    <input type="submit" value="Create"/>
                    <hr/>
                    <button className="switch-form" onClick={()=>Change()}>I already have an account</button>
                </div>
            </form>
        </div>
    )

}
export default RegisterForm