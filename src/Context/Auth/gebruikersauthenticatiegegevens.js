import React, { createContext, useState, useContext } from 'react';


export const AuthContext = React.createContext(undefined);


export function useAuth() {
    return useContext(AuthContext);
}


export const UserContext = createContext(undefined);


export function useUser() {
    return useContext(UserContext);
}


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);


    const updateUser = (data) => {
        setUserData(data);
    };


    return (
        <UserContext.Provider value={{ userData, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Functie om in te loggen
    const login = async (userData) => {
        try {
            const response = await fetch('https://api.datavortex.nl/NOVI Educational Backend/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error('Er is een fout opgetreden tijdens het inloggen:', error);
        }
    };


    const logout = () => {
        setUser(null);
    };


    const register = async (userData) => {
        try {
            const response = await fetch('https://api.datavortex.nl/NOVI Educational Backend/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'eindopdracht:3A0QHhPmag2XQ02xb2U3'
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error('Er is een fout opgetreden tijdens het registreren:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
