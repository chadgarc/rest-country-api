
export interface CountryData{
    code: string,
    name: string,
    nativeName: string,
    population: number,
    region: string,
    subRegion: string,
    capital: string,
    domain: string,
    currencies: string[],
    languages: string[],
    borderCountries: string[],
    flagRoute: string
}

export class Country implements CountryData {
    code: string;
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string;
    domain: string;
    currencies: string[];
    languages: string[];
    borderCountries: string[];
    flagRoute: string;

    constructor(
        code:string,
        name: string = '',
        nativeName: string = '',
        population: number = 0,
        region: string = '',
        subRegion: string = '',
        capital: string = '',
        domain: string = '',
        currencies: string[] = [],
        languages: string[] = [],
        borderCountries: string[] = [],
        flagRoute: string = ''
    ) {
        this.code = code || '';
        this.name = name || '';
        this.nativeName = nativeName || '';
        this.population = population || 0;
        this.region = region || '';
        this.subRegion = subRegion || '';
        this.capital = capital || '';
        this.domain = domain || '';
        this.currencies = currencies || '';
        this.languages = languages || [];
        this.borderCountries = borderCountries || [];
        this.flagRoute = flagRoute || '';
    }

    displayDetails(){
        return `Country: ${this.name}, Population: ${this.population}, Capital: ${this.capital}, Languages: ${this.languages.join(', ')}`;
    }

}
