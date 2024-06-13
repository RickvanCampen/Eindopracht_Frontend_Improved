import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useUser } from './gebruikersauthenticatiegegevens'; // Importeer de useAuth en useUser hooks

// Functionele component voor het inloggen
const LoginComponent = () => {

    const { login } = useAuth(); // Haalt de login-functie op van de useAuth-hook
    const { userData } = useUser(); // Haalt de userData op van de useUser-hook


    const [email, setEmail] = useState(''); // React-hook voor e-mailadres
    const [password, setPassword] = useState(''); // React-hook voor wachtwoord
    const [loggedIn, setLoggedIn] = useState(false); // React-hook voor inlogstatus
    const [error, setError] = useState(''); // React-hook voor foutmeldingen
    const [greeting, setGreeting] = useState(''); // React-hook voor groetbericht


    const greetingMessage = useRef('');


    useEffect(() => {
        const hour = new Date().getHours(); // Haalt het uur van de dag op

        // Bepaalt het groetbericht op basis van het tijdstip van de dag
        if (hour >= 5 && hour < 12) {
            greetingMessage.current = 'goedemorgen';
        } else if (hour >= 12 && hour < 18) {
            greetingMessage.current = 'goedemiddag';
        } else if (hour >= 18 && hour < 24) {
            greetingMessage.current = 'goedeavond';
        } else {
            greetingMessage.current = 'goedenacht';
        }


        setGreeting(greetingMessage.current);
    }, []);

    // Functie voor het valideren van een e-mailadres
    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/; // Regext voor het valideren van e-mailadres
        return emailRegex.test(email); // Retourneert true als het e-mailadres geldig is, anders false
    };

    // Functie voor het afhandelen van het inlogproces
    const handleLogin = async (e) => {
        e.preventDefault(); // Voorkomt standaardformuliergedrag

        try {

            if (!userData) {
                setError('U bent nog niet geregistreerd.');
                return;
            }
            if (!validateEmail(email)) {
                setError('Voer een geldig e-mailadres in.');
                return;
            }
            if (email !== userData.email || password !== userData.wachtwoord) {
                setError('Ongeldige e-mail of wachtwoord.');
                return;
            }


            await login({ email, password });
            setLoggedIn(true);
            setError(''); // Reset foutmelding bij succesvol inloggen
        } catch (error) {

            console.error('Er is een fout opgetreden tijdens het inloggen:', error);
            setError('Er is een fout opgetreden tijdens het inloggen.');
        }
    };

    // Rendert de inlogcomponent
    return (
        <div className="login-inhoud">
            <h2>Inloggen</h2>
            {/* Toont bericht bij succesvol inloggen */}
            {loggedIn && (
                <div>
                    <p>
                        U bent ingelogd, {greeting} {userData && userData.gebruikersnaam}! U kunt uw gegevens zien op de profielpagina!
                    </p>
                </div>
            )}
            {/* Toont foutmelding bij inlogfouten */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* Toont melding als gebruiker niet geregistreerd is */}
            {!userData && <div>U bent nog niet geregistreerd.</div>}
            {/* Inlogformulier */}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
};

export default LoginComponent;
