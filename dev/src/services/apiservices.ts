import { jsonNormalization, type CountryData } from "../entities/country";


enum apiCountry {
    URL = 'https://api.restcountries.com/countries/v5',
    CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/',
    DETAILS_PARAMETERS = 'response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png',
    TOKEN = 'Bearer rc_live_6de58c276c8c48c5b45ff954231d9d39',
    TOKEN_DEV = 'rc_live_31893b86ab1a4231be2c893453cbac9b'
}

/**
 * Fetches a paginated set of countries from the RestCountries API,
 * normalizes the response using `jsonNormalization()`, and returns
 * a typed array of `CountryData`.
 *
 * This function supports:
 * - Pagination via `limit` and `offset`
 * - CORS proxy usage (cors-anywhere)
 * - Custom response field selection through `DETAILS_PARAMETERS`
 *
 * If the request fails or the API returns a non‑OK status, the
 * function logs the error and returns an empty array.
 *
 * @param {number} [limit=20] - Number of countries to fetch.
 * @param {number} [startOn=0] - Offset used for pagination.
 *
 * @returns {Promise<CountryData[]>} A promise resolving to an array
 * of normalized country objects.
 *
 * @example
 * const batch = await getSetCountries(100, 200);
 * console.log(batch.length); // 100
 */
export const getSetCountries = async (limit: number = 20, startOn: number = 0) => {
    
    try{
        const response = await fetch(`${apiCountry.URL}?limit=${limit}&offset=${startOn}&${apiCountry.DETAILS_PARAMETERS}`,
            { method: "GET", headers: { 'Authorization': apiCountry.TOKEN }} );

        if(!response.ok) {
            throw new Error('Not able to get data');
        }

        const data = await response.json();

        console.log(data)
        const countries: CountryData[] = data.data.objects.map((country:any) => jsonNormalization(country))
        console.log(countries)
        return countries;
    } catch(error){
        console.error(error)
        return []
    }
}

/**
 * Fetches all countries belonging to a specific region from the
 * RestCountries API, normalizes the response, and returns the
 * resulting list.
 *
 * This function uses the same CORS proxy and authorization token
 * as `getSetCountries()`, but filters by region instead of using
 * pagination.
 *
 * If the request fails or the API returns a non‑OK status, the
 * function returns `undefined`.
 *
 * @param {string} region - Region name (e.g., "Europe", "Asia").
 *
 * @returns {Promise<CountryData[] | undefined>} A promise resolving
 * to an array of normalized country objects, or undefined on failure.
 *
 * @example
 * const europeanCountries = await getCountruesByRegion("Europe");
 * if (europeanCountries) {
 *   console.log(europeanCountries.length);
 * }
 */
export const getCountriesByRegion = async (region: string) => {

    try{
        const response = await fetch(`${apiCountry.URL}?${region}`,
            { method: "GET", headers: { 'Authorization': apiCountry.TOKEN }} );

        if(!response.ok) return;

        const data = await response.json();

        console.log(data);

        const countries: CountryData[] = data.data.objects.map((country:any) => jsonNormalization(country))
        
        return countries;
    } catch(error){

    }
}