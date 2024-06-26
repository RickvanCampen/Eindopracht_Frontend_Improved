import React, { useState, useEffect } from 'react';
import './FavoriteCitiesComponent.css';
import { dutchCities } from '../../Helper_Functie/Steden_en_Dorpen';

const FavoriteCitiesComponent = () => {
    const [favoriteCities, setFavoriteCities] = useState(() => {
        const storedCities = localStorage.getItem('favoriteCities');
        return storedCities ? JSON.parse(storedCities) : [];
    });

    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    }, [favoriteCities]);

    const handleAddFavorite = () => {
        if (selectedCity && !favoriteCities.includes(selectedCity)) {
            const updatedCities = [...favoriteCities, selectedCity];
            setFavoriteCities(updatedCities);
            setSelectedCity("");
        }
    };

    const handleRemoveFavorite = (city) => {
        const updatedCities = favoriteCities.filter((c) => c !== city);
        setFavoriteCities(updatedCities);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <h2>Favoriete Dorpen en Steden</h2>
            <ul className="city-list">
                {favoriteCities.map((city) => (
                    <li key={city} className="city-list-item">
                        {city}
                        <button onClick={() => handleRemoveFavorite(city)}>Verwijder</button>
                    </li>
                ))}
            </ul>
            <div className="city-select-container">
                <label htmlFor="city-select">Kies een dorp of stad:</label>
                <select id="city-select" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Kies een stad</option>
                    {dutchCities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddFavorite}>Voeg toe</button>
            </div>
        </div>
    );
};

export default FavoriteCitiesComponent;
