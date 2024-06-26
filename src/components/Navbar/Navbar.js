import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHome, faSignInAlt, faUserPlus, faUser, faShareAlt, faSun } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';


function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="navbar-items">
                <ul className="navbar-list">
                    <li>
                        <Link to="/" className="navbar-button">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="navbar-button">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Inloggen</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/7-day-forecast" className="navbar-button">
                            <FontAwesomeIcon icon={faSun} />
                            <span>7-daagse Weersvoorspelling</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="navbar-button">
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Registreren</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/share" className="navbar-button">
                            <FontAwesomeIcon icon={faShareAlt} />
                            <span>Deel weerbericht</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="navbar-button">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Profiel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/holidays" className="navbar-button">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Vakanties</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;


