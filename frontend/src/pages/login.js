import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError,handleSuccess } from './util'
function Login() {
    const [logininfo,setlogininfo]= useState({
        email: ' ',
        password:''
    })
    const navigate=useNavigate();
    const handleChange= (e)=>{
      const {name,value}=e.target;
      console.log(name,value);
      const copyloginInfo={...logininfo};
      copyloginInfo[name]=value;
      setlogininfo(copyloginInfo);
    }
    
    const handlelogin=async(e)=>{
        e.preventDefault();
        const {email,password}=logininfo;
        if( !email|| !password){
            return handleError('All fields are required');
        }
        try{
const url="http://localhost:8080/auth/login";
      const response = await fetch(url,{
      method: "POST",
      headers:{
    'Content-Type': 'application/json'
      },
      body: JSON.stringify(logininfo)
    });
    const result = await response.json();
    const{success,message,jwttoken,name,error}=result;
    if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwttoken);
        localStorage.setItem('loggedinuser',name);
        setTimeout(()=>{
          navigate('/home')
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
        <h1>login</h1>
        <form onSubmit={handlelogin}>
            <div class='labels'>
                <label htmlFor='email'>Email</label>
                <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email.......'
                value={logininfo.email}
                />           
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password..'
                value={logininfo.password}
                />           
            </div>
            <button type='submit'>login</button>
            <span>Don't have an account ?
                <Link class='linkk' to ="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login