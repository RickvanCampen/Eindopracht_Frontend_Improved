import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Auth/gebruikersauthenticatiegegevens';

// Definieert de functionele component ProfielPageComponent
const ProfielPageComponent = () => {
    const { userData, updateUser } = useContext(UserContext);
    const [formData, setFormData] = useState(userData || {
        gebruikersnaam: '',
        email: '',
        wachtwoord: '',
        voornaam: '',
        achternaam: '',
        geboortedatum: '',
        telefoonnummer: '',
        adres: '',
        postcode: '',
        stad: '',
        profielfoto: null,

    });
    const [successMessage, setSuccessMessage] = useState(''); // Staat voor het succesbericht na bijwerken van het profiel
    const [errors, setErrors] = useState({ // Staat voor validatiefouten van het formulier
        wachtwoord: '',
        herhaalWachtwoord: '',
        postcode: '',
        email: '',
        telefoonnummer: '',
    });

    // Effect-hook om het formulier opnieuw in te stellen wanneer de userData verandert
    useEffect(() => {
        setFormData(userData || { // Als userData bestaat, stel het in, anders gebruik standaardwaarden
            gebruikersnaam: '',
            email: '',
            wachtwoord: '',
            voornaam: '',
            achternaam: '',
            geboortedatum: '',
            telefoonnummer: '',
            adres: '',
            postcode: '',
            stad: '',
            profielfoto: null,
        });
    }, [userData]);

    // Functie om het formulier te valideren
    const validateForm = () => {
        const newErrors = {};

        if (formData.wachtwoord.length < 8) {  // Controleert of wachtwoord minimaal 8 tekens heeft
            newErrors.wachtwoord = 'Wachtwoord moet minimaal 8 karakters bevatten, met letters, cijfers en een leesteken.';
        }

        if (formData.wachtwoord !== formData.herhaalWachtwoord) { // Controleert of wachtwoord en herhaalwachtwoord overeenkomen
            newErrors.herhaalWachtwoord = 'Wachtwoord en herhaal wachtwoord komen niet overeen.';
        }

        if (!/^[0-9]{4}[a-zA-Z]{2}$/.test(formData.postcode)) { // Controleert de postcode op het juiste formaat
            newErrors.postcode = 'Postcode moet 4 cijfers bevatten, gevolgd door 2 letters.';
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) { // Controleert of e-mailadres een geldig formaat heeft
            newErrors.email = 'Voer een geldig e-mailadres in.';
        }

        if (!/^[0-9]{10}$/.test(formData.telefoonnummer)) { // Controleert of telefoonnummer 10 cijfers heeft
            newErrors.telefoonnummer = 'Voer een geldig telefoonnummer in (10 cijfers).';
        }

        setErrors(newErrors); // Stelt de fouten in

        return Object.keys(newErrors).length === 0; // Geeft true terug als er geen fouten zijn
    };

    // Functie om veranderingen in invoervelden bij te houden
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Haalt naam en waarde op van het invoerveld
        setFormData({ ...formData, [name]: value }); // Werkt de formData bij met de nieuwe waarde
    };

    // Functie om veranderingen in het profielfoto-bestand bij te houden
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profielfoto: file });
    };

    // Functie om een profielfoto te verwijderen
    const handleRemovePhoto = () => {
        setFormData({ ...formData, profielfoto: null }); // Verwijdert de profielfoto door deze op null te zetten
    };

    // Functie om het gebruikersprofiel bij te werken
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        if (validateForm()) { // Als het formulier geldig is
            updateUser(formData);
            setSuccessMessage('Uw gegevens zijn succesvol gewijzigd!');
            setErrors({ // Reset de fouten
                wachtwoord: '',
                herhaalWachtwoord: '',
                postcode: '',
                email: '',
                telefoonnummer: '',
            });
        }
    };

    // JSX voor het renderen van de gebruikersprofielpagina
    return(
        <div className="profiel-inhoud">
            <h2>Gebruikersprofiel</h2>
            {successMessage && <div style={{ color: '#0df541' }}>{successMessage}</div>}
            <div>
                <label>Profielfoto:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="custom-file-input"
                    style={{
                        backgroundColor: '#0df541',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '12px'
                    }}
                />
                {formData.profielfoto && (
                    <div>
                        <img
                            src={URL.createObjectURL(formData.profielfoto)}
                            alt="Profielfoto"
                            className="profile-image"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <button type="button" onClick={handleRemovePhoto} style={{ backgroundColor: '#0df541', color: 'white' }}>Verwijderen</button>
                    </div>
                )}
            </div>
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label>
                        Gebruikersnaam:
                    </label>
                    <input
                        type="text"
                        name="gebruikersnaam"
                        value={formData.gebruikersnaam}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>
                        E-mail:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>
                        Wachtwoord:
                    </label>
                    <input
                        type="password"
                        name="wachtwoord"
                        value={formData.wachtwoord}
                        onChange={handleInputChange}
                    />
                    {errors.wachtwoord && <div style={{ color: 'red' }}>{errors.wachtwoord}</div>}
                </div>
                <div>
                    <label>
                        Voornaam:
                    </label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>
                        Achternaam:
                    </label>
                    <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>
                        Geboortedatum:
                    </label>
                    <input
                        type="date"
                        name="geboortedatum"
                        value={formData.geboortedatum}
                        onChange={handleInputChange}
                        className="green-input"
                    />
                </div>
                <div>
                    <label>
                        Telefoonnummer:
                    </label>
                    <input
                        type="tel"
                        name="telefoonnummer"
                        value={formData.telefoonnummer}
                        onChange={handleInputChange}
                    />
                    {errors.telefoonnummer && <div style={{ color: 'red' }}>{errors.telefoonnummer}</div>}
                </div>
                <div>
                    <label>
                        Adres:
                    </label>
                    <input
                        type="text"
                        name="adres"
                        value={formData.adres}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>
                        Postcode:
                    </label>
                    <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.postcode && <div style={{ color: 'red' }}>{errors.postcode}</div>}
                </div>
                <div>
                    <label>
                        Stad:
                    </label>
                    <input
                        type="text"
                        name="stad"
                        value={formData.stad}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="custom-submit-button"
                    style={{
                        backgroundColor: '#0df541',
                        color: 'white',
                        padding: '2px 30px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '16px'
                    }}
                >
                    Profiel Bijwerken
                </button>
            </form>
        </div>
    );
};

export default ProfielPageComponent;
