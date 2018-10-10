import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage(props) {
    return (
        <div className="home centered-container"> 
            <h2>Welcome to Best Memories</h2>
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
}
