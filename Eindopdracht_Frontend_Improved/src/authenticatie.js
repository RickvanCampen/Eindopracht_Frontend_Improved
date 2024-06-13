// Voert een HTTP POST-verzoek uit naar de opgegeven URL om een gebruiker te authenticeren
fetch('https://api.datavortex.nl/testapp/users/authenticate', {
    method: 'POST', // Methode: POST
    headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
    },
    // Definieert het verzoeksblok met gebruikersgegevens als een JSON-object
    body: JSON.stringify({
        "username": "testuser",
        "password": "testpassword"
    })
})
    .then(response => {
        // Controleert of het antwoord OK is
        if (!response.ok) {
            // Gooit een fout als het antwoord niet OK is
            throw new Error('Er is een fout opgetreden bij het authenticeren van de gebruiker');
        }

        return response.json();
    })
    .then(data => {

    })
    .catch(error => {
        // Logt eventuele fouten naar de console
        console.error('Er is een fout opgetreden:', error);
    });
