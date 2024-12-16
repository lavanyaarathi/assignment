import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError,handleSuccess } from './util'
function Signup() {
    const [signupinfo,setsignupinfo]= useState({
        name: ' ',
        email: ' ',
        password: ' '
    })
    const navigate=useNavigate();
    const handleChange=async (e)=>{
      const {name,value}=e.target;
      console.log(name,value);
      const copysignupInfo={...signupinfo};
      copysignupInfo[name]=value;
      setsignupinfo(copysignupInfo);
    }
    
    const handleSignup=async(e)=>{
        e.preventDefault();
        const {name,email,password}=signupinfo;
        if(!name|| !email|| !password){
            return handleError('All fields are required');
        }
        try{
const url="http://localhost:8080/auth/signup";
      const response = await fetch(url,{
      method: "POST",
      headers:{
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupinfo)
    });
    const result = await response.json();
    const{success,message,error}=result;
    if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        }, 1000)
    }
    else if (error){
        const details=error?.details[0].message;
        handleError(details);
    }
    else if(!success){
        handleError(message);
    }
    console.log(result);
        } catch(err){
        handleError(err);
        }
    }
  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                onChange={handleChange}
                type='text'
                name='name'
                autoFocus
                placeholder='Enter your name.......'
                value={signupinfo.name}
                />           
            </div>
            <div class='forms'>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email.......'
                value={signupinfo.email}
                />           
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password..'
                value={signupinfo.password}
                />           
            </div>
            <button type='submit'>Signup</button>
            <span>Already have an account ?
                <Link to ="/login">Login</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup