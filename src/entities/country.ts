import type { CountryData } from "../types";

/**
 * A class implementation of the `CountryData` interface. Provides a
 * structured way to store country information and includes helper
 * methods for displaying formatted details.
 *
 * @class Country
 * @implements {CountryData}
 *
 * @example
 * const germany = new Country(normalizedData);
 * console.log(germany.displayDetails());
 */
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

    /**
     * Creates a new `Country` instance from normalized country data.
     *
     * @param {CountryData} country - The normalized country data object.
     */
    constructor(country: CountryData) {
        this.code = country.code;
        this.name = country.name;
        this.nativeName = country.nativeName;
        this.population = country.population;
        this.region = country.region;
        this.subRegion = country.subRegion;
        this.languages = country.languages;
        this.capital = country.capital;
        this.domain = country.domain;
        this.currencies = country.currencies;
        this.borderCountries = country.borderCountries;
        this.flagRoute = country.flagRoute;
    }

    /**
     * Returns a formatted string containing key country details.
     *
     * @returns {string} A human-readable summary of the country.
     *
     * @example
     * germany.displayDetails();
     * // "Country: Germany, Population: 83200000, Capital: Berlin, Languages: de"
     */
    displayDetails(): string {
        return `Country: ${this.name}, Population: ${this.population}, Capital: ${this.capital}, Languages: ${this.languages.join(', ')}`;
    }
}

/**
 * Normalizes raw country data into the standardized `CountryData` format
 * used throughout the application. Handles missing fields, inconsistent
 * structures, and optional values by providing fallback defaults.
 *
 * The normalization process includes:
 * - Extracting ISO alpha-3 codes (`alpha3Code`)
 * - Mapping official names (`name`)
 * - Mapping native names from nested objects
 * - Mapping languages and currencies
 * - Handling missing capitals, borders, and TLDs
 * - Providing fallback values when fields are unavailable
 *
 * @param {any} raw - The raw country object from the API or demo data.
 * @returns {CountryData} A fully normalized country data object.
 *
 * @example
 * const normalized = jsonNormalization(rawCountry);
 * const country = new Country(normalized);
 */
export const jsonNormalization = (raw: any): CountryData => {
    const code = raw.alpha3Code || 'UNK';
    const name = raw.name || "No Oficial Name";
    const population = raw.population || 0;
    const subRegion = raw.subregion || "No available";
    const region = raw.region || "No available";
    const borderCountries = raw.borders || ['N/A'];
    const flagRoute = raw.flags.png || '../../assets/placeholder-flag.webp';
    const domain = raw.topLevelDomain?.length ? raw.topLevelDomain[0] : 'No domain';
    const nativeName = raw.nativeName
    ? Object.values(raw.names.native).map((language:any) => language.official)
    : ['N/A'];
    const languages = raw.languages?.length
    ? raw.languages.map((language:any) => language.iso639_1 || language.name)
    : ['No Oficial Language'];
    const capital = raw.capital?.length
    ?raw.capital.map( (capital:any) => capital.name)
    : ['No oficial capital'];
    const currencies = raw.currencies?.length
    ? raw.currencies.map((currency:any) => currency.code)
    : ['No oficial currency'];
    
    console.log(name)

    return {code,name,nativeName,population,region,subRegion,capital,languages,domain,currencies,borderCountries,flagRoute};
}
// export const jsonAPINormalization = (raw: any): CountryData => {
//     const code = raw.codes?.alpha_3 || 'UNK';
//     const name = raw.names?.official || "No Oficial Name";
//     const population = raw.population || 0;
//     const subRegion = raw.subregion || "No available";
//     const region = raw.region || "No available";
//     const borderCountries = raw.borders || ['N/A'];
//     const flagRoute = raw.flag?.url_png || '../../assets/placeholder-flag.webp';
//     const domain = raw.tlds?.length ? raw.tlds[0] : 'No domain';
//     const nativeName = raw.names?.native
//     ? Object.values(raw.names.native).map((language:any) => language.official)
//     : ['N/A'];
//     const languages = raw.languages?.length
//     ? raw.languages.map((language:any) => language.iso639_1 || language.name)
//     : ['No Oficial Language'];
//     const capital = raw.capitals?.length
//     ?raw.capitals.map( (capital:any) => capital.name)
//     : ['No oficial capital'];
//     const currencies = raw.currencies?.length
//     ? raw.currencies.map((currency:any) => currency.code)
//     : ['No oficial currency'];
    
//     console.log(name)

//     return {code,name,nativeName,population,region,subRegion,capital,languages,domain,currencies,borderCountries,flagRoute};
// }
