import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import WeatherComponent from './components/Weather/WeatherComponent';
import HolidayComponent from './components/Holiday/HolidayComponent';
import LoginComponent from './components/Auth/LoginComponent';
import SevenDayForecast from './components/Weather/SevenDayForecast';
import SignUpComponent from './components/Auth/SignUpComponent';
import ShareWeatherComponent from './components/Weather/ShareWeatherComponent';
import { AuthProvider } from './components/Auth/gebruikersauthenticatiegegevens';
import { UserProvider } from './components/Auth/gebruikersauthenticatiegegevens';
import Navbar from './components/Navbar/Navbar';
import ProfielPageComponent from './components/Profile/ProfielPageComponent';
import NotesSidebar from './components/NoteSidebar/NotesSidebar';
import Notification from './Notification';

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Notification />
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <Navbar>
                                <div className="Navbar-left">
                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                    <Link to="/">Weather</Link>
                                </div>
                                <div className="Navbar-center">

                                </div>
                                <div className="Navbar-right">
                                    <FontAwesomeIcon icon={faUser} />
                                    <Link to="/profile">Profiel</Link>
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                    <Link to="/login">Login</Link>
                                </div>
                            </Navbar>
                        </header>
                        <div className="content-wrapper">
                            <div className="notes-weather-container">
                                <NotesSidebar />
                                <WeatherComponent />
                            </div>
                            <Routes> {/* Definieert routes */}
                                <Route path="/" element={<HolidayComponent />} />
                                <Route path="/holidays" element={<HolidayComponent />} />
                                <Route path="/login" element={<LoginComponent />} />
                                <Route path="/7-day-forecast" element={<SevenDayForecast />} />
                                <Route path="/signup" element={<SignUpComponent />} />
                                <Route path="/share" element={<ShareWeatherComponent weatherData="Vandaag wordt het zonnig!" />} />
                                <Route path="/profile" element={<ProfielPageComponent />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
