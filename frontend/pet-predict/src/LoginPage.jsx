import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AboutPage.css'; 

function LoginPage() {
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [errorMessage, setErrorMessage]=useState('')
  const navigate=useNavigate()

  function handleUsernameChange(e){
    setUsername(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function successfulLogin(){
    localStorage.setItem('userValid', 'yes');
    localStorage.setItem('username', username)
    navigate('/');
  }

  async function handleLoginType(e) {
    e.preventDefault();
    await sendData('login');
  }

  async function sendData(requestType) {
    const url=`http://localhost:5010/${requestType}`
    try {
      const response=await fetch(url, {
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({username:username, password:password})
      });
      const responseData=await response.json()
        if(response.ok){
            setErrorMessage('')
            //succesfulLoginOrRegister(username)
            successfulLogin();
        }
        else{
            setErrorMessage(responseData.message)
        }   
    } catch (error) {
      console.error('errors', error)
    }
  }

 return (
    <div className="login-container">
      <h2 className="header">Login to Animal Prediction 🐾</h2>
      <form className="login-form">
        <input 
          required 
          type="text" 
          placeholder="Username" 
          className="form-input" 
          onChange={handleUsernameChange} 
        />
        <input 
          required 
          type="password" 
          placeholder="Password" 
          className="form-input" 
          onChange={handlePasswordChange} 
        />
        <button type="submit" className="action-button" onClick={handleLoginType}>Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/" className="home-link">Go back home</Link>
      </form>
    </div>
  );
}

export default LoginPage;
