import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/Auth/gebruikersauthenticatiegegevens';
import './SignUpComponent.css';


const SignUpComponent = () => {
    const { updateUser } = useContext(UserContext);


    const [formData, setFormData] = useState({
        gebruikersnaam: '',
        email: '',
        wachtwoord: '',
        herhaalWachtwoord: '',
        voornaam: '',
        achternaam: '',
        geboortedatum: '',
        telefoonnummer: '',
        adres: '',
        postcode: '',
        stad: '',
        profielfoto: null,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({
        wachtwoord: '',
        herhaalWachtwoord: '',
        postcode: '',
        email: '',
        telefoonnummer: '',
    });


    const validateForm = () => {
        const newErrors = {};

        if (formData.wachtwoord.length < 8) {
            newErrors.wachtwoord = 'Wachtwoord moet minimaal 8 karakters bevatten, met letters, cijfers en een leesteken.';
        }

        if (formData.wachtwoord !== formData.herhaalWachtwoord) {
            newErrors.herhaalWachtwoord = 'Wachtwoord en herhaal wachtwoord komen niet overeen.';
        }

        if (!/^[0-9]{4}[a-zA-Z]{2}$/.test(formData.postcode)) {
            newErrors.postcode = 'Postcode moet 4 cijfers bevatten, gevolgd door 2 letters.';
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Voer een geldig e-mailadres in.';
        }

        if (!/^[0-9]{10}$/.test(formData.telefoonnummer)) {
            newErrors.telefoonnummer = 'Voer een geldig telefoonnummer in (10 cijfers).';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profielfoto: file });
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        if (validateForm()) {

            updateUser(formData);
            setSuccessMessage('Uw gegevens zijn succesvol geregistreerd, u kunt nu inloggen!');
            setFormData({
                gebruikersnaam: '',
                email: '',
                wachtwoord: '',
                herhaalWachtwoord: '',
                voornaam: '',
                achternaam: '',
                geboortedatum: '',
                telefoonnummer: '',
                adres: '',
                postcode: '',
                stad: '',
                profielfoto: null,
            });
            setErrors({
                wachtwoord: '',
                herhaalWachtwoord: '',
                postcode: '',
                email: '',
                telefoonnummer: '',
            });
        }
    };

    return (
        <div className="registreren-inhoud">
            <h2>Registreren</h2>
            {successMessage && <div style={{ color: '#0df541' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
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
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            fontSize: '10px'
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
                        </div>
                    )}
                </div>
                <div>
                    <label>
                        Gebruikersnaam<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="text"
                        name="gebruikersnaam"
                        value={formData.gebruikersnaam}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        E-mail<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>
                        Wachtwoord<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="password"
                        name="wachtwoord"
                        value={formData.wachtwoord}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.wachtwoord && <div style={{ color: 'red' }}>{errors.wachtwoord}</div>}
                </div>
                <div>
                    <label>
                        Herhaal wachtwoord<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="password"
                        name="herhaalWachtwoord"
                        value={formData.herhaalWachtwoord}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.herhaalWachtwoord && <div style={{ color: 'red' }}>{errors.herhaalWachtwoord}</div>}
                </div>
                <div>
                    <label>
                        Voornaam<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        Achternaam<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        Geboortedatum<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="date"
                        name="geboortedatum"
                        value={formData.geboortedatum}
                        onChange={handleInputChange}
                        className="green-input"
                        required
                    />
                </div>
                <div>
                    <label>
                        Telefoonnummer<span style={{ color: '#0df541' }}>*</span>:
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
                        Postcode<span style={{ color: '#0df541' }}>*</span>:
                    </label>
                    <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                    />{errors.postcode && <div style={{ color: 'red' }}>{errors.postcode}</div>}
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
                        padding: '3px 30px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        fontSize: '16px'
                    }}
                >
                    Registreren
                </button>
            </form>
        </div>
    );
};

export default SignUpComponent;
