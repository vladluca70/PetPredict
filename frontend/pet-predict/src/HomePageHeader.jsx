import { Link } from 'react-router-dom';
import './CssFiles/HomePage.css'; 

function HomePageHeader() {
    return (
        <header className="header">
            <div className="nav-links">
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/predictpet">Predict Pet</Link>
                <Link to="/predictimage">Predict Image</Link>
            </div>
        </header>
    );
}

export default HomePageHeader;
