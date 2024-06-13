import React, { useState, useEffect } from 'react';

// Component voor het weergeven van meldingen
const Notification = () => {
    // Staat om bij te houden of de melding zichtbaar is
    const [isVisible, setIsVisible] = useState(true);

    // Effect om de melding na 10 seconden te verbergen
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000); // Melding blijft 10 seconden zichtbaar

        // Schoonmaakfunctie om timer te annuleren bij het verwijderen van de component
        return () => clearTimeout(timer);
    }, []);

    // Render de melding als isVisible waar is
    return (
        <>
            {isVisible && (
                <div className="notification flashing">
                    <p>U kunt de applicatie gebruiken zonder te registreren, dit bericht verwijdert automatisch</p>
                </div>
            )}
        </>
    );
};

export default Notification; //Exporteert de Notification,js
