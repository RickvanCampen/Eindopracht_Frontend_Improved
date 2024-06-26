import React, { useState } from 'react';
import dutchCities from '../../Helper_Functie/Steden_en_Dorpen';
import './SearchComponent.css';

const SearchComponent = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const filteredResults = dutchCities.filter(city =>
            city.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Zoek stad of dorp"
            />
            <button onClick={handleSearch}>Zoeken</button>
            <ul>
                {results.map((city, index) => (
                    <li key={index} onClick={() => onCitySelect(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
