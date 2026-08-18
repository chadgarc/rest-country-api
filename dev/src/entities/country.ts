
export interface CountryData{
    code: string,
    name: string,
    nativeName: string[],
    population: number,
    region: string,
    subRegion: string,
    capital: string[],
    domain: string,
    currencies: string[],
    languages: string[],
    borderCountries: string[],
    flagRoute: string
}

export class Country implements CountryData {
    code: string;
    name: string;
    nativeName: string[];
    population: number;
    region: string;
    subRegion: string;
    capital: string[];
    domain: string;
    currencies: string[];
    languages: string[];
    borderCountries: string[];
    flagRoute: string;

    constructor(country: CountryData) {
        this.code = country.code; // always alpha3, that's the standard codes.alpha_3
        this.name = country.name; // names.official
        this.nativeName = country.nativeName; // names.native
        this.population = country.population; // population
        this.region = country.region; // region
        this.subRegion = country.subRegion ; // subregion
        this.languages = country.languages; // standard iso639_1 languages.iso639_1
        this.capital = country.capital; // capitals.name[]
        this.domain = country.domain; // tlds
        this.currencies = country.currencies; // currencies.code []
        this.borderCountries = country.borderCountries; // borders
        this.flagRoute = country.flagRoute; //flag.url_png
    }

    displayDetails(){
        return `Country: ${this.name}, Population: ${this.population}, Capital: ${this.capital}, Languages: ${this.languages.join(', ')}`;
    }

}

export const jsonNormalization = (raw: any): CountryData => {
    const code = raw.codes?.alpha_3 || 'UNK';
    const name = raw.names?.official || "No Oficial Name";
    const population = raw.population || 0;
    const subRegion = raw.subregion || "No available";
    const region = raw.region || "No available";
    const borderCountries = raw.borders || ['N/A'];
    const flagRoute = raw.flag?.url_png || '../../assets/placeholder-flag.webp';
    const domain = raw.tlds?.length ? raw.tlds[0] : 'No domain';
    const nativeName = raw.names?.native
    ? Object.values(raw.names.native).map((language:any) => language.official)
    : ['N/A'];
    const languages = raw.languages?.length
    ? raw.languages.map((language:any) => language.iso639_1 || language.name)
    : ['No Oficial Language'];
    const capital = raw.capitals?.length
    ?raw.capitals.map( (capital:any) => capital.name)
    : ['No oficial capital'];
    const currencies = raw.currencies?.length
    ? raw.currencies.map((currency:any) => currency.code)
    : ['No oficial currency'];
    
    console.log(name)

    return {code,name,nativeName,population,region,subRegion,capital,languages,domain,currencies,borderCountries,flagRoute};
}
