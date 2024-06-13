import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHome, faSignInAlt, faUserPlus, faUser, faShareAlt, faSun } from '@fortawesome/free-solid-svg-icons';

// Functie voor het weergeven van de navigatiebalk
function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="navbar-items">
                <ul className="navbar-list">
                    {/* Home link */}
                    <li>
                        <Link to="/" className="navbar-button">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </Link>
                    </li>
                    {/* Inloggen link */}
                    <li>
                        <Link to="/login" className="navbar-button">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Inloggen</span>
                        </Link>
                    </li>
                    {/* 7-daagse weersvoorspelling link */}
                    <li>
                        <Link to="/7-day-forecast" className="navbar-button">
                            <FontAwesomeIcon icon={faSun} />
                            <span>7-daagse Weersvoorspelling</span>
                        </Link>
                    </li>
                    {/* Registreren link */}
                    <li>
                        <Link to="/signup" className="navbar-button">
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>Registreren</span>
                        </Link>
                    </li>
                    {/* Deel weerbericht link */}
                    <li>
                        <Link to="/share" className="navbar-button">
                            <FontAwesomeIcon icon={faShareAlt} />
                            <span>Deel weerbericht</span>
                        </Link>
                    </li>
                    {/* Profiel link */}
                    <li>
                        <Link to="/profile" className="navbar-button">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Profiel</span>
                        </Link>
                    </li>
                    {/* Vakanties link */}
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


