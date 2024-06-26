import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherAlertComponent.css';

const WeatherAlertComponent = ({ city, apiKey }) => {
    const [weatherAlert, setWeatherAlert] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherAlert = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=nl`);
                const lat = response?.data?.coord?.lat;
                const lon = response?.data?.coord?.lon;
                if (lat && lon) {
                    const oneCallResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}`);
                    const alerts = oneCallResponse?.data?.alerts;
                    if (alerts && alerts.length > 0) {
                        setWeatherAlert(alerts[0]);
                    } else {
                        setWeatherAlert(null);
                    }
                } else {
                    setWeatherAlert(null);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Er is een fout opgetreden bij het ophalen van weerinformatie.');
            }
        };

        fetchWeatherAlert().catch((error) => {
            console.error('Error fetching weather alerts:', error);
            setError('Er is een fout opgetreden bij het ophalen van weerwaarschuwingen.');
        });
    }, [city, apiKey]);

    return (
        <div className="weather-alert">
            <h3>Weerwaarschuwing</h3>
            {error ? (
                <p>{error}</p>
            ) : (
                weatherAlert ? (
                    <div className="alert-message">
                        <p>{weatherAlert.event}</p>
                        <p>{weatherAlert.description}</p>
                        <p>Start: {new Date(weatherAlert.start * 1000).toLocaleString()}</p>
                        <p>Einde: {new Date(weatherAlert.end * 1000).toLocaleString()}</p>
                    </div>
                ) : (
                    <p>Geen weerwaarschuwingen op dit moment.</p>
                )
            )}
        </div>
    );
};

export default WeatherAlertComponent;
