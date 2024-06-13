import React, { useState, useEffect } from 'react';
import '../../styles/index.css';

// Definieert de WeatherComponent functionele component
const WeatherComponent = () => {
    // Definieert de verschillende states met useState hook
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("Tilburg");
    const [error, setError] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState("");
    const [imageSize, setImageSize] = useState(500);

    // Haalt de API-sleutel op uit de omgevingsvariabele
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    // Lijst van Nederlandse steden en dorpen
    const dutchCities = ['Aarle-Rixtel', 'Alkmaar', 'Almere', 'Almelo', 'Alphen aan den Rijn', 'Alphen-Chaam', 'Amersfoort', 'Amstelveen', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Assen', 'Asten', 'Baarle-Nassau', 'Barendrecht', 'Barneveld', 'Beek', 'Beek en Donk', 'Beesel', 'Berg en Dal', 'Bergen op Zoom', 'Bergeijk', 'Berkelland', 'Berkel-Enschot', 'Berlicum', 'Bernheze', 'Best', 'Beuningen', 'Bladel', 'Blaricum', 'Bloemendaal', 'Bodegraven-Reeuwijk', 'Boekel', 'Borger-Odoorn', 'Borne', 'Borsele', 'Boxmeer', 'Boxtel', 'Breda', 'Brielle', 'Bronckhorst', 'Brummen', 'Brunssum', 'Bunnik', 'Bunschoten', 'Buren', 'Capelle aan den IJssel', 'Castricum', 'Coevorden', 'Cranendonck', 'Cuijk', 'Culemborg', 'Dalfsen', 'Dantumadiel', 'De Bilt', 'De Fryske Marren', 'De Ronde Venen', 'De Wolden', 'Delft', 'Delfzijl', 'Den Haag', 'Den Helder', 'Deurne', 'Deventer', 'Diemen', 'Dinkelland', 'Doesburg', 'Doetinchem', 'Dongen', 'Dordrecht', 'Drechterland', 'Drimmelen', 'Dronten', 'Druten', 'Duiven', 'Echt-Susteren', 'Edam-Volendam', 'Ede', 'Eemnes', 'Eindhoven', 'Elburg', 'Emmen', 'Enkhuizen', 'Enschede', 'Epe', 'Ermelo', 'Etten-Leur', 'Geertruidenberg', 'Geldrop', 'Geldrop-Mierlo', 'Gemert', 'Gemert-Bakel', 'Gennep', 'Gilze', 'Gilze en Rijen', 'Goeree-Overflakkee', 'Goes', 'Goirle', 'Gooise Meren', 'Gorinchem', 'Gouda', 'Grave', 'Groningen', 'Gulpen-Wittem', 'Haaksbergen', 'Haaren', 'Haarlem', 'Haarlemmermeer', 'Halderberge', 'Hardenberg', 'Harderwijk', 'Hardinxveld-Giessendam', 'Harlingen', 'Hattem', 'Heemskerk', 'Heemstede', 'Heerde', 'Heerenveen', 'Heerhugowaard', 'Heerlen', 'Heesch', 'Heeze', 'Heeze-Leende', 'Heiloo', 'Hellendoorn', 'Hellevoetsluis', 'Helmond', 'Hendrik-Ido-Ambacht', 'Hengelo', 'Het Hogeland', 'Heumen', 'Heusden', 'Hillegom', 'Hilvarenbeek', 'Hilversum', 'Hof van Twente', 'Hollands Kroon', 'Hoogeveen', 'Hoogezand-Sappemeer', 'Hoorn', 'Horst aan de Maas', 'Houten', 'Huizen', 'Hulst', 'IJsselstein', 'Kaag en Braassem', 'Kampen', 'Kapelle', 'Katwijk', 'Kerkrade', 'Koggenland', 'Krimpen aan den IJssel', 'Krimpenerwaard', 'Laarbeek', 'Landerd', 'Landgraaf', 'Landsmeer', 'Langedijk', 'Lansingerland', 'Laren', 'Leeuwarden', 'Leiden', 'Leiderdorp', 'Leidschendam-Voorburg', 'Lelystad', 'Leudal', 'Leusden', 'Lingewaard', 'Lisse', 'Lochem', 'Loon op Zand', 'Losser', 'Maasdriel', 'Maasgouw', 'Maassluis', 'Maastricht', 'Medemblik', 'Meierijstad', 'Meppel', 'Middelburg', 'Midden-Delfland', 'Midden-Drenthe', 'Midden-Groningen', 'Mill en Sint Hubert', 'Moerdijk', 'Molenlanden', 'Montferland', 'Montfoort', 'Mook en Middelaar', 'Neder-Betuwe', 'Nederweert', 'Nieuwegein', 'Nieuwkoop', 'Nijkerk', 'Nijmegen', 'Nissewaard', 'Noardeast-Fryslân', 'Noord-Beveland', 'Noordenveld', 'Noordoostpolder', 'Noordwijk', 'Noordwijkerhout', 'Nuenen', 'Nuenen, Gerwen en Nederwetten', 'Nunspeet', 'Nuth', 'Oegstgeest', 'Oirschot', 'Oisterwijk', 'Oldambt', 'Oldebroek', 'Oldenzaal', 'Olst-Wijhe', 'Ommen', 'Oost Gelre', 'Oosterhout', 'Ooststellingwerf', 'Oostzaan', 'Opmeer', 'Opsterland', 'Oss', 'Oude IJsselstreek', 'Ouder-Amstel', 'Oudewater', 'Overbetuwe', 'Papendrecht', 'Peel en Maas', 'Pekela', 'Pijnacker-Nootdorp', 'Purmerend', 'Putten', 'Raalte', 'Reimerswaal', 'Renkum', 'Renswoude', 'Reusel-De Mierden', 'Rheden', 'Rhenen', 'Ridderkerk', 'Rijssen-Holten', 'Rijswijk', 'Roerdalen', 'Roermond', 'Roosendaal', 'Rotterdam', 'Rozendaal', 'Rucphen', 'Schagen', 'Schaijk', 'Scherpenzeel', 'Schiedam', 'Schiermonnikoog', 'Schouwen-Duiveland', 'Simpelveld', 'Sint Anthonis', 'Sint-Michielsgestel', 'Sittard-Geleen', 'Sliedrecht', 'Sluis', 'Smallingerland', 'Soest', 'Someren', 'Son', 'Son en Breugel', 'Sprang-Capelle', 'Stadskanaal', 'Staphorst', 'Stede Broec', 'Steenbergen', 'Steenwijkerland', 'Stein', 'Stichtse Vecht', 'Súdwest-Fryslân', 'Terneuzen', 'Terschelling', 'Texel', 'Teylingen', 'Tholen', 'Tiel', 'Tietjerksteradeel', 'Tilburg', 'Tubbergen', 'Twenterand', 'Tynaarlo', 'Tytsjerksteradiel', 'Uden', 'Udenhout', 'Uitgeest', 'Uithoorn', 'Urk', 'Utrecht', 'Utrechtse Heuvelrug', 'Vaals', 'Valkenburg aan de Geul', 'Valkenswaard', 'Veendam', 'Veenendaal', 'Veere', 'Veghel', 'Veldhoven', 'Velsen', 'Venlo', 'Venray', 'Vianen', 'Vijfheerenlanden', 'Vlaardingen', 'Vlieland', 'Vlissingen', 'Voerendaal', 'Voorschoten', 'Voorst', 'Vught', 'Waadhoeke', 'Waalre', 'Waalwijk', 'Waardenburg', 'Waddinxveen', 'Wageningen', 'Wassenaar', 'Waterland', 'Weert', 'Weesp', 'Werkendam', 'West Betuwe', 'West Maas en Waal', 'Westerkwartier', 'Westerveld', 'Westervoort', 'Westerwolde', 'Westland', 'Weststellingwerf', 'Westvoorne', 'Wierden', 'Wijchen', 'Wijdemeren', 'Wijk bij Duurstede', 'Winterswijk', 'Woensdrecht', 'Woerden', 'Wormerland', 'Woudenberg', 'Woudrichem', 'Wijk en Aalburg', 'Zaanstad', 'Zaltbommel', 'Zandvoort', 'Zeeland', 'Zeewolde', 'Zeist', 'Zevenaar', 'Zevenbergen', 'Zuidplas', 'Zundert', 'Zutphen', 'Zwartewaterland', 'Zwijndrecht', 'Zwolle' ];

    // Effect-hook om weerdata op te halen bij het wijzigen van stad of API-sleutel
    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=nl`
            );
            if (!response.ok) {
                throw new Error("Gegevens niet gevonden, kies een andere optie.");
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
            setWeatherIcon(data.weather[0].icon);
            setWeatherDescription(data.weather[0].description);
        };

        fetchWeatherData().catch(error => setError(error.message)); // Roept de functie voor het ophalen van weerdata aan
    }, [city, apiKey]);

    // Effect-hook om de huidige datum en tijd bij te werken
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString()); // Update de huidige datum en tijd
        };

        const intervalId = setInterval(updateDateTime, 1000); // Start een interval om de datum en tijd elke seconde bij te werken

        return () => clearInterval(intervalId);
    }, []);

    // Handlerfunctie om de geselecteerde stad bij te werken wanneer deze verandert
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    // Functie om de grootte van de weerkaart te wisselen tussen 500 en 800
    const toggleImageSize = () => {
        setImageSize(size => (size === 500 ? 800 : 500));
    };

    // Rendert de WeatherComponent
    return (
        <div className="weather-container"> {/* Container voor het weercomponent */}
            <div className="weather-widget"> {/* Widget voor het weergave van weerinformatie */}
                <select id="city-select" value={city} onChange={handleCityChange}> {/* Selectieveld voor steden of dorpen */}
                    {dutchCities.map((city) => ( // Toont de opties voor Nederlandse steden of dorpen
                        <option key={city} value={city}> {/* Optie voor elke stad */}
                            {city} {/* Naam van de stad */}
                        </option>
                    ))}
                </select>
                {error && <p>{error}</p>} {/* Toon foutmelding indien aanwezig */}
                {weatherData && ( // Toont weerinformatie indien beschikbaar
                    <div>
                        <header>
                            <h2>Huidige weer in {weatherData.name}</h2> {/* Weerinformatie voor de geselecteerde stad */}
                        </header>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
                            alt="Weather Icon"
                            style={{ width: "100px", height: "100px" }}
                        />
                        <p>Weer: {weatherDescription}</p>
                        <p>Temperatuur: {weatherData.main.temp} °C</p>
                        <p>Voelt aan als: {weatherData.main.feels_like} °C</p>
                        <p>Minimale temperatuur: {weatherData.main.temp_min} °C</p>
                        <p>Maximale temperatuur: {weatherData.main.temp_max} °C</p>
                        <p>Luchtvochtigheid: {weatherData.main.humidity}%</p>
                        <p className="date-time">Huidige datum en tijd: {currentDateTime}</p>
                        <button onClick={toggleImageSize} style={{ marginTop: '56px' }}> {/* Knop om de grootte van de weerkaart te wijzigen */}
                            {imageSize === 500 ? 'Vergroot weerkaart' : 'Verklein weerkaart'}
                        </button>
                        <div style={{ marginTop: '20px', width: imageSize, height: imageSize * 0.6, overflow: 'hidden' }}>
                            <iframe
                                title="Weather Map"
                                width={imageSize}
                                height={imageSize * 0.6 } // Behoud de aspect ratio
                                src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&zoom=10`}
                                style={{ border: 'none', position: 'absolute', top: '685px' }}
                            ></iframe>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherComponent;