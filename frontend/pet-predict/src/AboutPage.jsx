import { Link, useNavigate } from 'react-router-dom';
import './AboutPage.css'; 

function AboutPage() {
  const userValid = localStorage.getItem('userValid');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem('userValid', 'no');
    navigate('/');
  }

  if (userValid === 'yes' && username) {
    return (
      <div className="about-container">
        <h2 className="header">Animal Prediction Portal 🐾</h2>
        <h3>Welcome, {username}!</h3>

        <div className="section">
          <h4>Prediction by Values</h4>
          <p>Enter numeric or categorical data to predict animal characteristics or behavior.</p>
          <Link to="/predictpet">
            <button className="action-button">Go to Value Prediction</button>
          </Link>
        </div>

        <div className="section">
          <h4>Prediction by Images</h4>
          <p>Upload an image of an animal and get predictions based on visual analysis.</p>
          <Link to="/predictimage">
            <button className="action-button">Go to Image Prediction</button>
          </Link>
        </div>

        <button className="action-button" onClick={handleLogout}>Logout</button>
        <br/>
        <Link to="/" className="home-link">Go back home</Link>
      </div>
    );
  } else {
    return (
      <div className="about-container">
        <h2 className="header">Animal Prediction Portal 🐾</h2>
        <p>Please log in to access prediction features.</p>
        <Link to="/" className="home-link">Go back home</Link>
      </div>
    );
  }
}

export default AboutPage;
