import React, { useState, useEffect, useCallback } from 'react';

const SevenDayForecast = () => {
    // State-hooks voor het weerbericht, foutmeldingen en geselecteerde stad of dorp
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedCity, setSelectedCity] = useState('Tilburg'); // Standaardstad


    const dutchCities = ['Aarle-Rixtel', 'Alkmaar', 'Almere', 'Almelo', 'Alphen aan den Rijn', 'Alphen-Chaam', 'Amersfoort', 'Amstelveen', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Assen', 'Asten', 'Baarle-Nassau', 'Barendrecht', 'Barneveld', 'Beek', 'Beek en Donk', 'Beesel', 'Berg en Dal', 'Bergen op Zoom', 'Bergeijk', 'Berkelland', 'Berkel-Enschot', 'Berlicum', 'Bernheze', 'Best', 'Beuningen', 'Bladel', 'Blaricum', 'Bloemendaal', 'Bodegraven-Reeuwijk', 'Boekel', 'Borger-Odoorn', 'Borne', 'Borsele', 'Boxmeer', 'Boxtel', 'Breda', 'Brielle', 'Bronckhorst', 'Brummen', 'Brunssum', 'Bunnik', 'Bunschoten', 'Buren', 'Capelle aan den IJssel', 'Castricum', 'Coevorden', 'Cranendonck', 'Cuijk', 'Culemborg', 'Dalfsen', 'Dantumadiel', 'De Bilt', 'De Fryske Marren', 'De Ronde Venen', 'De Wolden', 'Delft', 'Delfzijl', 'Den Haag', 'Den Helder', 'Deurne', 'Deventer', 'Diemen', 'Dinkelland', 'Doesburg', 'Doetinchem', 'Dongen', 'Dordrecht', 'Drechterland', 'Drimmelen', 'Dronten', 'Druten', 'Duiven', 'Echt-Susteren', 'Edam-Volendam', 'Ede', 'Eemnes', 'Eindhoven', 'Elburg', 'Emmen', 'Enkhuizen', 'Enschede', 'Epe', 'Ermelo', 'Etten-Leur', 'Geertruidenberg', 'Geldrop', 'Geldrop-Mierlo', 'Gemert', 'Gemert-Bakel', 'Gennep', 'Gilze', 'Gilze en Rijen', 'Goeree-Overflakkee', 'Goes', 'Goirle', 'Gooise Meren', 'Gorinchem', 'Gouda', 'Grave', 'Groningen', 'Gulpen-Wittem', 'Haaksbergen', 'Haaren', 'Haarlem', 'Haarlemmermeer', 'Halderberge', 'Hardenberg', 'Harderwijk', 'Hardinxveld-Giessendam', 'Harlingen', 'Hattem', 'Heemskerk', 'Heemstede', 'Heerde', 'Heerenveen', 'Heerhugowaard', 'Heerlen', 'Heesch', 'Heeze', 'Heeze-Leende', 'Heiloo', 'Hellendoorn', 'Hellevoetsluis', 'Helmond', 'Hendrik-Ido-Ambacht', 'Hengelo', 'Het Hogeland', 'Heumen', 'Heusden', 'Hillegom', 'Hilvarenbeek', 'Hilversum', 'Hof van Twente', 'Hollands Kroon', 'Hoogeveen', 'Hoogezand-Sappemeer', 'Hoorn', 'Horst aan de Maas', 'Houten', 'Huizen', 'Hulst', 'IJsselstein', 'Kaag en Braassem', 'Kampen', 'Kapelle', 'Katwijk', 'Kerkrade', 'Koggenland', 'Krimpen aan den IJssel', 'Krimpenerwaard', 'Laarbeek', 'Landerd', 'Landgraaf', 'Landsmeer', 'Langedijk', 'Lansingerland', 'Laren', 'Leeuwarden', 'Leiden', 'Leiderdorp', 'Leidschendam-Voorburg', 'Lelystad', 'Leudal', 'Leusden', 'Lingewaard', 'Lisse', 'Lochem', 'Loon op Zand', 'Losser', 'Maasdriel', 'Maasgouw', 'Maassluis', 'Maastricht', 'Medemblik', 'Meierijstad', 'Meppel', 'Middelburg', 'Midden-Delfland', 'Midden-Drenthe', 'Midden-Groningen', 'Mill en Sint Hubert', 'Moerdijk', 'Molenlanden', 'Montferland', 'Montfoort', 'Mook en Middelaar', 'Neder-Betuwe', 'Nederweert', 'Nieuwegein', 'Nieuwkoop', 'Nijkerk', 'Nijmegen', 'Nissewaard', 'Noardeast-Fryslân', 'Noord-Beveland', 'Noordenveld', 'Noordoostpolder', 'Noordwijk', 'Noordwijkerhout', 'Nuenen', 'Nuenen, Gerwen en Nederwetten', 'Nunspeet', 'Nuth', 'Oegstgeest', 'Oirschot', 'Oisterwijk', 'Oldambt', 'Oldebroek', 'Oldenzaal', 'Olst-Wijhe', 'Ommen', 'Oost Gelre', 'Oosterhout', 'Ooststellingwerf', 'Oostzaan', 'Opmeer', 'Opsterland', 'Oss', 'Oude IJsselstreek', 'Ouder-Amstel', 'Oudewater', 'Overbetuwe', 'Papendrecht', 'Peel en Maas', 'Pekela', 'Pijnacker-Nootdorp', 'Purmerend', 'Putten', 'Raalte', 'Reimerswaal', 'Renkum', 'Renswoude', 'Reusel-De Mierden', 'Rheden', 'Rhenen', 'Ridderkerk', 'Rijssen-Holten', 'Rijswijk', 'Roerdalen', 'Roermond', 'Roosendaal', 'Rotterdam', 'Rozendaal', 'Rucphen', 'Schagen', 'Schaijk', 'Scherpenzeel', 'Schiedam', 'Schiermonnikoog', 'Schouwen-Duiveland', 'Simpelveld', 'Sint Anthonis', 'Sint-Michielsgestel', 'Sittard-Geleen', 'Sliedrecht', 'Sluis', 'Smallingerland', 'Soest', 'Someren', 'Son', 'Son en Breugel', 'Sprang-Capelle', 'Stadskanaal', 'Staphorst', 'Stede Broec', 'Steenbergen', 'Steenwijkerland', 'Stein', 'Stichtse Vecht', 'Súdwest-Fryslân', 'Terneuzen', 'Terschelling', 'Texel', 'Teylingen', 'Tholen', 'Tiel', 'Tietjerksteradeel', 'Tilburg', 'Tubbergen', 'Twenterand', 'Tynaarlo', 'Tytsjerksteradiel', 'Uden', 'Udenhout', 'Uitgeest', 'Uithoorn', 'Urk', 'Utrecht', 'Utrechtse Heuvelrug', 'Vaals', 'Valkenburg aan de Geul', 'Valkenswaard', 'Veendam', 'Veenendaal', 'Veere', 'Veghel', 'Veldhoven', 'Velsen', 'Venlo', 'Venray', 'Vianen', 'Vijfheerenlanden', 'Vlaardingen', 'Vlieland', 'Vlissingen', 'Voerendaal', 'Voorschoten', 'Voorst', 'Vught', 'Waadhoeke', 'Waalre', 'Waalwijk', 'Waardenburg', 'Waddinxveen', 'Wageningen', 'Wassenaar', 'Waterland', 'Weert', 'Weesp', 'Werkendam', 'West Betuwe', 'West Maas en Waal', 'Westerkwartier', 'Westerveld', 'Westervoort', 'Westerwolde', 'Westland', 'Weststellingwerf', 'Westvoorne', 'Wierden', 'Wijchen', 'Wijdemeren', 'Wijk bij Duurstede', 'Winterswijk', 'Woensdrecht', 'Woerden', 'Wormerland', 'Woudenberg', 'Woudrichem', 'Wijk en Aalburg', 'Zaanstad', 'Zaltbommel', 'Zandvoort', 'Zeeland', 'Zeewolde', 'Zeist', 'Zevenaar', 'Zevenbergen', 'Zuidplas', 'Zundert', 'Zutphen', 'Zwartewaterland', 'Zwijndrecht', 'Zwolle' ];

    const fetchWeatherData = useCallback(async () => {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric&lang=nl`
        );

        // Controleren op fouten bij het ophalen van de data
        if (!response.ok) {
            setError("Stad niet gevonden, kies een andere stad.");
            setWeatherData(null);
            return;
        }

        const data = await response.json();
        setWeatherData(data);
        setError(null);
    }, [selectedCity]);

    // Effect-hook om weerdata op te halen bij wijzigingen in de geselecteerde stad  of dorp
    useEffect(() => {
        fetchWeatherData().catch((error) => {
            console.error('Error fetching weather data:', error);
            setError('Er is een fout opgetreden bij het ophalen van de weersvoorspelling. Controleer de console voor meer details.');
        });
    }, [fetchWeatherData]);

    // Functie om unieke datums op te halen
    const getUniqueDates = () => {
        if (!weatherData) return [];
        const uniqueDates = {};
        weatherData.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            uniqueDates[date] = true;
        });
        return Object.keys(uniqueDates).slice(0, 7);
    };

    // Functie om weerdata voor een specifieke dag op te halen
    const getDayData = (date) => {
        const dayData = weatherData.list.filter((item) => item.dt_txt.includes(date)); // Filteren van weerdata voor een specifieke dag
        const minTemp = Math.min(...dayData.map((item) => item.main.temp_min)); // Minimum temperatuur berekenen
        const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max)); // Maximum temperatuur berekenen
        const avgTemp = dayData.reduce((total, item) => total + item.main.temp, 0) / dayData.length; // Gemiddelde temperatuur berekenen
        return { minTemp, maxTemp, avgTemp }; // Minimale, maximale en gemiddelde temperatuur teruggeven
    };

    return (
        <div className="zevendagen-inhoud"> {/* Hoofdcontainer voor de 7-daagse weersvoorspelling */}
            <h2>7-daagse weersvoorspelling voor {weatherData ? weatherData.city.name : selectedCity}</h2> {/* Titel voor de weersvoorspelling */}
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="selected-city">
                {dutchCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* Weergave van foutmelding of laadindicator */}
            {error && <div>{error}</div>}
            {!error && !weatherData && <div>Loading...</div>}

            {/* Weergave van weerdata in een tabel */}
            {weatherData && (
                <table>
                    <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Min. Temp (&deg;C)</th>
                        <th>Gem. Temp (&deg;C)</th>
                        <th>Max. Temp (&deg;C)</th>
                        <th>Beschrijving</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Mapping van unieke datums naar tabelrijen */}
                    {getUniqueDates().map((date) => {
                        const { minTemp, maxTemp, avgTemp } = getDayData(date);
                        const dayWeather = weatherData.list.find((item) => item.dt_txt.includes(date)).weather[0].description; // Weerbeschrijving voor de dag
                        return (
                            <tr key={date}>
                                <td>{new Date(date).toLocaleDateString()}</td> {/* Datum weergeven in lokale datumnotatie */}
                                <td>{minTemp.toFixed(1)}</td> {/* Minimum temperatuur */}
                                <td>{avgTemp.toFixed(1)}</td> {/* Gemiddelde temperatuur */}
                                <td>{maxTemp.toFixed(1)}</td> {/* Maximum temperatuur */}
                                <td>{dayWeather}</td> {/* Weerbeschrijving */}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SevenDayForecast;
