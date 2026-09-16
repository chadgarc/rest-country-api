/**
 * Defines the shape of the ThemeContext value.
 * @interface
 * @property {'light' | 'dark'} theme - Current theme state.
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes.
 */
export interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

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

export interface CountrySet{
    countryName: string,
    countryCode: string
}

export interface CountryStackType {
    countrySet: CountrySet[]
}

export type Regions = 
| "Africa"
| "Americas"
| "Asia"
| "Europe"
| "Oceania";