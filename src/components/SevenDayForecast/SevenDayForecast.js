import React, { useState, useEffect, useCallback } from 'react';
import { dutchCities } from '../../Helper_Functie/Steden_en_Dorpen';

const SevenDayForecast = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState('Tilburg');



    const fetchWeatherData = useCallback(async () => {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric&lang=nl`
        );

        // Controleren op fouten bij het ophalen van de data
        if (!response.ok) {
            setError("Stad niet gevonden, kies een andere stad.");
            setWeatherData(null);
            return;
        }

        const data = await response.json();
        setWeatherData(data);
        setError(null);
    }, [selectedCity]);

    useEffect(() => {
        fetchWeatherData().catch((error) => {
            console.error('Error fetching weather data:', error);
            setError('Er is een fout opgetreden bij het ophalen van de weersvoorspelling. Controleer de console voor meer details.');
        });
    }, [fetchWeatherData]);

    const getUniqueDates = () => {
        if (!weatherData) return [];
        const uniqueDates = {};
        weatherData.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            uniqueDates[date] = true;
        });
        return Object.keys(uniqueDates).slice(0, 7);
    };

    const getDayData = (date) => {
        const dayData = weatherData.list.filter((item) => item.dt_txt.includes(date));
        const minTemp = Math.min(...dayData.map((item) => item.main.temp_min));
        const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max));
        const avgTemp = dayData.reduce((total, item) => total + item.main.temp, 0) / dayData.length;
        return { minTemp, maxTemp, avgTemp };
    };

    return (
        <div className="zevendagen-inhoud">
            <h2>7-daagse weersvoorspelling voor {weatherData ? weatherData.city.name : selectedCity}</h2>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="selected-city">
                {dutchCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {error && <div>{error}</div>}
            {!error && !weatherData && <div>Loading...</div>}

            {weatherData && (
                <table>
                    <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Min. Temp (&deg;C)</th>
                        <th>Gem. Temp (&deg;C)</th>
                        <th>Max. Temp (&deg;C)</th>
                        <th>Beschrijving</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getUniqueDates().map((date) => {
                        const { minTemp, maxTemp, avgTemp } = getDayData(date);
                        const dayWeather = weatherData.list.find((item) => item.dt_txt.includes(date)).weather[0].description; // Weerbeschrijving voor de dag
                        return (
                            <tr key={date}>
                                <td>{new Date(date).toLocaleDateString()}</td>
                                <td>{minTemp.toFixed(1)}</td>
                                <td>{avgTemp.toFixed(1)}</td>
                                <td>{maxTemp.toFixed(1)}</td>
                                <td>{dayWeather}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SevenDayForecast;
