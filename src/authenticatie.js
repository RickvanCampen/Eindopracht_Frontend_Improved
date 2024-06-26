fetch('https://api.datavortex.nl/testapp/users/authenticate', {
    method: 'POST', // Methode: POST
    headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "testuser",
        "password": "testpassword"
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Er is een fout opgetreden bij het authenticeren van de gebruiker');
        }

        return response.json();
    })
    .then(data => {

    })
    .catch(error => {
        console.error('Er is een fout opgetreden:', error);
    });
