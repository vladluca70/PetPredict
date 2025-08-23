import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AboutPage() {
  const userValid=localStorage.getItem('userValid')
  const navigate=useNavigate();

  function handleLogout(){
    localStorage.setItem('userValid', 'no')
    navigate('/');
  }

  if(userValid==='yes'){
    return (
    <>
      <h2>About Page</h2>
      <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link> <br/>
      <button onClick={handleLogout}>Logout</button>
    </>)
  }
  else{
    return(<>
      <Link to="/" style={{ margin: '0 10px' }}>Go back home</Link>
    </>)
  }

}

export default AboutPage;
