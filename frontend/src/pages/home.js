import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError,handleSuccess } from './util'
function Home() {
  const [loggedinuser, setloggedinuser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedinuser');
    if (user) {
      setloggedinuser(user);
    } else {
      
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container" >
      <h1>Welcome, {loggedinuser}!</h1>
      <p>You have successfully logged into the Great Web Kingdom.</p>
    </div>
  );
}

export default Home;
