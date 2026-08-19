
/**
 * Represents the normalized structure of country data used throughout
 * the application. All fields are standardized to ensure consistency
 * across UI components and API responses.
 *
 * @interface CountryData
 *
 * @property {string} code - The ISO alpha-3 country code.
 * @property {string} name - The official country name.
 * @property {string[]} nativeName - List of native names in different languages.
 * @property {number} population - Total population count.
 * @property {string} region - The geographical region (e.g., "Europe").
 * @property {string} subRegion - The subregion (e.g., "Western Europe").
 * @property {string[]} capital - List of capital cities.
 * @property {string} domain - The top-level domain (e.g., ".de").
 * @property {string[]} currencies - List of currency codes.
 * @property {string[]} languages - List of language identifiers.
 * @property {string[]} borderCountries - List of neighboring country codes.
 * @property {string} flagRoute - URL to the country’s PNG flag.
 */

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

/**
 * A class implementation of the `CountryData` interface. This class
 * provides a structured way to store country information and includes
 * helper methods for displaying formatted details.
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
     * Creates a new Country instance from normalized country data.
     *
     * @param {CountryData} country - The normalized country data object.
     */
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

    /**
     * Returns a formatted string containing key country details.
     *
     * @returns {string} A human-readable summary of the country.
     *
     * @example
     * germany.displayDetails();
     * // "Country: Germany, Population: 83200000, Capital: Berlin, Languages: de"
     */
    displayDetails(){
        return `Country: ${this.name}, Population: ${this.population}, Capital: ${this.capital}, Languages: ${this.languages.join(', ')}`;
    }

}

/**
 * Normalizes raw API country data into the standardized `CountryData`
 * format used throughout the application. This function ensures that
 * missing fields, inconsistent structures, and optional values are
 * safely handled and converted into predictable formats.
 *
 * The normalization process includes:
 * - Extracting ISO codes, names, population, region, and subregion
 * - Mapping native names from nested objects
 * - Mapping languages and currencies
 * - Handling missing capitals, borders, and TLDs
 * - Providing fallback values when API fields are unavailable
 *
 * @param {any} raw - The raw country object returned by the API.
 *
 * @returns {CountryData} A fully normalized country data object.
 *
 * @example
 * const normalized = jsonNormalization(rawCountry);
 * const country = new Country(normalized);
 */
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
