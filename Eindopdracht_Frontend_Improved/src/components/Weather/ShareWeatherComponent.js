import React, { useState } from 'react';

const ShareWeatherComponent = () => {
    // State-hook voor het weerbericht dat gedeeld wordt
    const [weatherData, setWeatherData] = useState('');

    // Functie om het weerbericht te delen op het opgegeven platform
    const shareWeather = (platform) => {

        alert(`Weerbericht gedeeld op ${platform}: ${weatherData}`);
    };

    // Event handler om wijzigingen in het weerberichtveld te volgen
    const handleInputChange = (e) => {
        setWeatherData(e.target.value);
    };

    return (
        <div className="share-inhoud"> {/* Hoofdcontainer voor het delen van het weerbericht */}
            <h2>Weerbericht Delen</h2> {/* Titel voor het delen van het weerbericht */}
            <div className="input-container"> {/* Container voor invoerveld */}
                {/* Tekstgebied voor het invoeren van het weerbericht */}
                <textarea
                    value={weatherData}
                    onChange={handleInputChange}
                    placeholder="Voer hier uw gegevens in"
                    style={{
                        width: '100%',
                        height: '100px',
                        maxWidth: '417px',
                        direction: 'ltr',
                        textAlign: 'start',
                        resize: 'vertical',
                        border: '2px solid #0df541'
                    }}
                />
            </div>
            <div> {/* Container voor deelknoppen */}
                {/* Mapping van deelknoppen voor verschillende platforms */}
                {['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'LinkedIn', 'Snapchat', 'TikTok'].map((platform) => (
                    <button key={platform} onClick={() => shareWeather(platform)}> {/* Knop voor het delen van het weerbericht op een specifiek platform */}
                        Deel op {platform} {/* Tekst op deelknop */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShareWeatherComponent;
