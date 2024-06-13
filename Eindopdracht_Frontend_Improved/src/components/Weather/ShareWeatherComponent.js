import React, { useState } from 'react';

const ShareWeatherComponent = () => {
    const [weatherData, setWeatherData] = useState('');

    const shareWeather = (platform) => {

        alert(`Weerbericht gedeeld op ${platform}: ${weatherData}`);
    };

    const handleInputChange = (e) => {
        setWeatherData(e.target.value);
    };

    return (
        <div className="share-inhoud">
            <h2>Weerbericht Delen</h2>
            <div className="input-container">
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
            <div>
                {['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'LinkedIn', 'Snapchat', 'TikTok'].map((platform) => (
                    <button key={platform} onClick={() => shareWeather(platform)}>
                        Deel op {platform}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShareWeatherComponent;
