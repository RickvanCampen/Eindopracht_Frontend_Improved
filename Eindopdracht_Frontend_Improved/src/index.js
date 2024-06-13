import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Rendert de hoofdcomponent van de React-toepassing in de DOM
ReactDOM.render(
    // Strikt modus gebruiken voor extra controles en waarschuwingen tijdens ontwikkeling
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // Zoekt het element met de id 'root' in de HTML en vervangt de inhoud ervan door de React-toepassing
    document.getElementById('root')
);
