import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useUser } from '../../Context/Auth/gebruikersauthenticatiegegevens';
import './LoginComponent.css';



const LoginComponent = () => {

    const { login } = useAuth();
    const { userData } = useUser();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [greeting, setGreeting] = useState('');


    const greetingMessage = useRef('');


    useEffect(() => {
        const hour = new Date().getHours();


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


    const validateEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };


    const handleLogin = async (e) => {
        e.preventDefault();

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
            setError('');
        } catch (error) {

            console.error('Er is een fout opgetreden tijdens het inloggen:', error);
            setError('Er is een fout opgetreden tijdens het inloggen.');
        }
    };

    return (
        <div className="login-inhoud">
            <h2>Inloggen</h2>
            {loggedIn && (
                <div>
                    <p>
                        U bent ingelogd, {greeting} {userData && userData.gebruikersnaam}! U kunt uw gegevens zien op de profielpagina!
                    </p>
                </div>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!userData && <div>U bent nog niet geregistreerd.</div>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
};

export default LoginComponent;
