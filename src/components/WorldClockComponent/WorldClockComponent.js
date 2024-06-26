import React, { useState } from 'react';
import moment from 'moment-timezone';
import './WorldClockComponent.css';

const WorldClockComponent = () => {
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const timezones = moment.tz.names();

    const handleTimezoneChange = (event) => {
        const timezone = event.target.value;
        setSelectedTimezone(timezone);
        const time = moment().tz(timezone).format('HH:mm:ss');
        setCurrentTime(time);
    };

    return (
        <div>
            <h2>Wereldklok</h2>
            <div className="timezone-select-container">
                <label htmlFor="timezone-select">Kies een tijdzone:</label>
                <select
                    id="timezone-select"
                    className="timezone-select"
                    value={selectedTimezone}
                    onChange={handleTimezoneChange}
                >
                    <option value="">Selecteer een tijdzone</option>
                    {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                    ))}
                </select>
            </div>
            {currentTime && (
                <div className="current-time">
                    <p>De huidige tijd in {selectedTimezone} is:</p>
                    <p>{currentTime}</p>
                </div>
            )}
        </div>
    );
};

export default WorldClockComponent;
