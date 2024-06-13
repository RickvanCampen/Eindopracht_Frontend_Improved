import React, { useState, useEffect } from 'react';
import '../../styles/index.css';
import { dutchCities } from '../../Helper_Functie/Steden_en_Dorpen';
const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Tilburg");
    const [error, setError] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState("");
    const [imageSize, setImageSize] = useState(500);

    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;




    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=nl`
            );
            if (!response.ok) {
                throw new Error("Gegevens niet gevonden, kies een andere optie.");
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
            setWeatherIcon(data.weather[0].icon);
            setWeatherDescription(data.weather[0].description);
        };

        fetchWeatherData().catch(error => setError(error.message));
    }, [city, apiKey]);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString());
        };

        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const toggleImageSize = () => {
        setImageSize(size => (size === 500? 800 : 500));
    };

    // Rendert de WeatherComponent
    return (
        <div className="weather-container">
            <div className="weather-widget">
                <select id="city-select" value={city} onChange={handleCityChange}>
                    {dutchCities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {error && <p>{error}</p>}
                {weatherData && (
                    <div>
                        <header>
                            <h2>Huidige weer in {weatherData.name}</h2>
                        </header>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
                            alt="Weather Icon"
                            style={{ width: "100px", height: "100px" }}
                        />
                        <p>Weer: {weatherDescription}</p>
                        <p>Temperatuur: {weatherData.main.temp} °C</p>
                        <p>Voelt aan als: {weatherData.main.feels_like} °C</p>
                        <p>Minimale temperatuur: {weatherData.main.temp_min} °C</p>
                        <p>Maximale temperatuur: {weatherData.main.temp_max} °C</p>
                        <p>Luchtvochtigheid: {weatherData.main.humidity}%</p>
                        <p className="date-time">Huidige datum en tijd: {currentDateTime}</p>
                        <button onClick={toggleImageSize} style={{ marginTop: '56px' }}>
                            {imageSize === 500? 'Vergroot weerkaart' : 'Verklein weerkaart'}
                        </button>
                        <div style={{ marginTop: '20px', width: imageSize, height: imageSize * 0.6, overflow: 'hidden' }}>
                            <iframe
                                title="Weather Map"
                                width={imageSize}
                                height={imageSize * 0.6 } // Behoud de aspect ratio
                                src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&zoom=10`}
                                style={{ border: 'none', position: 'absolute', top: '685px' }}
                            ></iframe>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherComponent;