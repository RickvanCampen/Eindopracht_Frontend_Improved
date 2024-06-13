// Voertt een POST-verzoek uit naar de endpoint voor gebruikersregistratie met opgegeven gebruikersgegevens
fetch('https://api.datavortex.nl/NOVI Educational Backend/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'eindopdracht:3A0QHhPmag2XQ02xb2U3'
    },
    body: JSON.stringify({
        naam: 'Bart Smit',
        leeftijd: 42,
        email: 'bartsmit@example.com',
        wachtwoord: 'mijnveiligwachtwoord',
        voorkeuren: ['voorkeur1', 'voorkeur2'],
        interesses: ['interesse1', 'interesse2'],
        tijdzone: 'Europe/Amsterdam'
    })
})
    .then(response => response.json())
    .catch(error => {
        console.error(error);
    });
