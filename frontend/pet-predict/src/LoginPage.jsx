import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')

  function handleUsernameChange(e){
    setUsername(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input required type="text" placeholder="Username" onChange={(e)=>handleUsernameChange(e)}/>
        <input required type="password" placeholder="Password" onChange={(e)=>handlePasswordChange(e)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
