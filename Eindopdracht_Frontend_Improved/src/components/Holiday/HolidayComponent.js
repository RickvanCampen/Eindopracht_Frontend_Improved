import React, { useState, useEffect, useCallback } from 'react';

const HolidayComponent = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());


    const selectedCountry = 'NL';

    // Definieert fetchHolidays met useCallback om het te memoriseren en te voorkomen dat het opnieuw wordt gemaakt bij elke re-render
    const fetchHolidays = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/${selectedCountry}`);
            const data = await response.json();

            const newHolidays = selectedCountry === 'NL' ? [...data, { name: 'Oudjaarsdag', date: `${selectedYear}-12-31` }] : data;

            const translatedHolidays = newHolidays.map(holiday => ({
                ...holiday,
                name: translateHolidayName(holiday.name), // Vertaalt de vakantienaam
                date: formatDate(holiday.date) // Formatteert de datum
            }));


            setHolidays(translatedHolidays);
        } catch (error) {

            setError('Er is een fout opgetreden bij het ophalen van de vakantiegegevens.');
        } finally {
            setLoading(false);
        }
    }, [selectedYear, selectedCountry]);

    useEffect(() => {
        const loadHolidays = (callback) => {
            fetchHolidays().then(() => callback()).catch(callback);
        };

        loadHolidays((error) => {
            if (error) {
                console.error('Er is een fout opgetreden tijdens het laden van de vakantiegegevens:', error);
            }
        });

    }, [fetchHolidays]);

    const translateHolidayName = (englishName) => {
        switch (englishName) {
            case "New Year's Day":
                return 'Nieuwjaarsdag';
            case 'Good Friday':
                return 'Goede Vrijdag';
            case 'Easter Sunday':
                return 'Paaszondag';
            case 'Easter Monday':
                return 'Tweede Paasdag';
            case "King's Day":
                return 'Koningsdag';
            case 'Liberation Day':
                return 'Bevrijdingsdag';
            case 'Ascension Day':
                return 'Hemelvaartsdag';
            case 'Pentecost':
                return 'Pinksteren';
            case 'Whit Monday':
                return 'Tweede Pinksterdag';
            case 'Christmas Day':
                return 'Eerste Kerstdag';
            case "St. Stephen's Day":
                return 'Tweede Kerstdag';
            default:
                return englishName;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL');
    };


    return (
        <div>
            <div className="navigatie-inhoud">
                <h2>Vakantiedagen Nederland</h2>
                <div>
                    <input type="number" className="year-input" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <ul>
                        {holidays.map((holiday, index) => (
                            <li key={index}>{holiday.name} - {holiday.date}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HolidayComponent;
