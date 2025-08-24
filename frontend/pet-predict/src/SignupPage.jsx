import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignupPage() {
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

  function successfulSignup(){
    localStorage.setItem('userValid', 'yes')
    localStorage.setItem('username', username)
    navigate('/')
  }

  async function handleLoginType(e) {
    e.preventDefault();
    await sendData('signup');
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
            successfulSignup();
            //succesfulLoginOrRegister(username)
        }
        else{
            setErrorMessage(responseData.message)
        }   
    } catch (error) {
      console.error('errors', error)
    }
  }

  return (
    <div>
      <h2>Signup Page</h2>
      <form>
        <input required type="text" placeholder="Username" onChange={(e)=>handleUsernameChange(e)}/>
        <input required type="password" placeholder="Password" onChange={(e)=>handlePasswordChange(e)}/>
        <button type="submit" onClick={handleLoginType}>Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
        <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link> <br/>
      </form>
    </div>
  );
}

export default SignupPage;
