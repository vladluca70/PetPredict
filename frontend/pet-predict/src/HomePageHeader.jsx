import React from 'react';
import { Link } from 'react-router-dom';

function HomePageHeader() {
    return (
        <header style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/about" style={{ margin: '0 10px' }}>About</Link>
                <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
                <Link to="/signup" style={{ margin: '0 10px' }}>Signup</Link>
                <Link to="/predictpet" style={{ margin: '0 10px' }}>Predict Pet</Link>
            </div>
        </header>
    );
}

export default HomePageHeader;
