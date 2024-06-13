// Voertt een POST-verzoek uit naar de endpoint voor gebruikersregistratie met opgegeven gebruikersgegevens
fetch('https://api.datavortex.nl/NOVI Educational Backend/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'eindopdracht:3A0QHhPmag2XQ02xb2U3'
    },
    body: JSON.stringify({ // Zet de gebruikersgegevens om naar JSON-formaat en stelt deze in als het lichaam van het verzoek
        naam: 'Bart Smit',
        leeftijd: 42,
        email: 'bartsmit@example.com',
        wachtwoord: 'mijnveiligwachtwoord',
        voorkeuren: ['voorkeur1', 'voorkeur2'],
        interesses: ['interesse1', 'interesse2'],
        tijdzone: 'Europe/Amsterdam'
    })
})
    .then(response => response.json()) // Verwerkt de JSON-reactie van de server
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
