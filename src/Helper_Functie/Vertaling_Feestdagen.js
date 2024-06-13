// Vertaling_Feestdagen.js

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

export default translateHolidayName;
