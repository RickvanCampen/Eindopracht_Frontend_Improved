import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import WeatherComponent from './components/Weather/WeatherComponent';
import HolidayComponent from './components/Holiday/HolidayComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import SevenDayForecastComponent from './components/SevenDayForecast/SevenDayForecast';
import SignUpComponent from './components/SignUpComponent/SignUpComponent';
import ShareWeatherComponent from './components/ShareWeather/ShareWeatherComponent';
import { AuthProvider } from './Context/Auth/gebruikersauthenticatiegegevens';
import { UserProvider } from './Context/Auth/gebruikersauthenticatiegegevens';
import Navbar from './components/Navbar/Navbar';
import ProfielPageComponent from './components/Profile/ProfielPageComponent';
import NotesSidebar from './components/NoteSidebar/NotesSidebar';
import Notification from './Notification';
import SearchComponent from './components/SearchComponent/SearchComponent';
import FavoriteCitiesComponent from './components/FavoriteCitiesComponent/FavoriteCitiesComponent';
import WorldClockComponent from './components/WorldClockComponent/WorldClockComponent';
import WeatherAlertComponent from './components/WeatherAlertComponent/WeatherAlertComponent';

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
                                    <SearchComponent />
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
                                <FavoriteCitiesComponent />
                                <WorldClockComponent />
                            </div>
                            <Routes>
                                <Route path="/" element={<WeatherComponent />} />
                                <Route path="/holidays" element={<HolidayComponent />} />
                                <Route path="/login" element={<LoginComponent />} />
                                <Route path="/7-day-forecast" element={<SevenDayForecastComponent />} />
                                <Route path="/signup" element={<SignUpComponent />} />
                                <Route path="/share" element={<ShareWeatherComponent />} />
                                <Route path="/profile" element={<ProfielPageComponent />} />
                                <Route path="/weather-alerts" element={<WeatherAlertComponent />} /> {/* Nieuwe route voor WeatherAlertComponent */}
                            </Routes>
                        </div>
                    </div>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
