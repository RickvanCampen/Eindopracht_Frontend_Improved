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
        <AuthProvider> {/* Biedt authenticatiecontext aan */}
            <UserProvider> {/* Biedt gebruikerscontext aan */}
                <Notification /> {/* Toont de meldingscomponent */}
                <Router> {/* Gebruikt de BrowserRouter voor routing */}
                    <div className="App">
                        <header className="App-header">
                            <Navbar> {/* Navigatiebalk */}
                                <div className="Navbar-left">
                                    <FontAwesomeIcon icon={faCalendarAlt} /> {/* Weerpictogram */}
                                    <Link to="/">Weather</Link> {/* Linkt naar weerpagina */}
                                </div>
                                <div className="Navbar-center">
                                    {/* Zoekbalk kan hier worden toegevoegd */}
                                </div>
                                <div className="Navbar-right">
                                    <FontAwesomeIcon icon={faUser} /> {/* Gebruikerspictogram */}
                                    <Link to="/profile">Profiel</Link> {/* Linkt naar profielpagina */}
                                    <FontAwesomeIcon icon={faSignInAlt} /> {/* Aanmeldingspictogram */}
                                    <Link to="/login">Login</Link> {/* Linkt naar inlogpagina */}
                                </div>
                            </Navbar>
                        </header>
                        <div className="content-wrapper">
                            <div className="notes-weather-container">
                                <NotesSidebar /> {/* Zijbalk met notities */}
                                <WeatherComponent /> {/* Weercomponent */}
                            </div>
                            <Routes> {/* Definieert routes */}
                                <Route path="/" element={<HolidayComponent />} /> {/* Route naar vakantiepagina */}
                                <Route path="/holidays" element={<HolidayComponent />} /> {/* Route naar vakantiepagina */}
                                <Route path="/login" element={<LoginComponent />} /> {/* Route naar inlogpagina */}
                                <Route path="/7-day-forecast" element={<SevenDayForecast />} /> {/* Route naar 7-daagse weersvoorspelling */}
                                <Route path="/signup" element={<SignUpComponent />} /> {/* Route naar aanmeldpagina */}
                                <Route path="/share" element={<ShareWeatherComponent weatherData="Vandaag wordt het zonnig!" />} /> {/* Route naar weer delen */}
                                <Route path="/profile" element={<ProfielPageComponent />} /> {/* Route naar profielpagina */}
                            </Routes>
                        </div>
                    </div>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
