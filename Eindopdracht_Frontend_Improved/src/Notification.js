import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

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

export default Notification;
