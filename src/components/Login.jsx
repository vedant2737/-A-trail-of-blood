import React, { useEffect, useState } from 'react'
import cross from '../img/cross.png'
import defaultUserImage from '../img/defautUserImage.webp'
import Add from "../img/boy.jpg"
import Check from "../img/boy.jpg"
import Register from './Register'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Login = ({popup=false,setLogin}) => {
    const [show, setShow] = useState(popup)
    const [err, setErr] = useState("");
    const [pic, setPic] = useState("");
    const [register, setRegister] = useState(false);

    const handleClick = () => {
        setShow(!show);
        setRegister(false);
    }
    const handleClick1=()=>{
        setShow(false);
        if(setLogin)setLogin(false);
        setRegister(false);
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

       try{    
          await signInWithEmailAndPassword(auth, email, password);
          if(setLogin){setLogin(false);}
          setShow(!show)
       } catch(err){
          setErr("Something Went Wrong.")
       }
    }

  return (
    <>
    <div className='Register'>
            <button onClick={handleClick}><img src={defaultUserImage} /></button>
            {show &&
                <div className='register'>
                    <img className='cross' onClick={handleClick} src={cross} />
                    <p className='p'>Login</p>
                    <form className="form top" onSubmit={handleSubmit}>
                        <input type='email' required placeholder="Email" />
                        <input type='password' required placeholder="Password" />
                        <button>Sign In</button>
                        {err && <span>{err}</span>}
                    </form>
                    <p>You don't have an account? <span onClick={(e)=>{setRegister(true); setShow(false);}}>Register</span></p>
                </div>
            }
    </div>
    {register && <Register popup={register} handleClick1={handleClick1}/>}
    </>
  )
}

export default Login