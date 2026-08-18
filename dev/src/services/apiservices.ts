import { jsonNormalization, type CountryData } from "../entities/country";


enum apiCountry {
    URL = 'https://api.restcountries.com/countries/v5',
    CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/',
    DETAILS_PARAMETERS = 'response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png',
    TOKEN = 'Bearer rc_live_6de58c276c8c48c5b45ff954231d9d39',
}

export const getSetCountries = async (limit: number = 20, startOn: number = 0) => {
    
    try{
        const response = await fetch(`${apiCountry.CORS_ANYWHERE}${apiCountry.URL}?limit=${limit}&offset=${startOn}&${apiCountry.DETAILS_PARAMETERS}`,
            { method: "GET", headers: { 'Authorization': 'rc_live_31893b86ab1a4231be2c893453cbac9b' }} );

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

export const getCountruesByRegion = async (region: string) => {

    try{
        const response = await fetch(`${apiCountry.CORS_ANYWHERE}${apiCountry.URL}?${region}`,
            { method: "GET", headers: { 'Authorization': 'rc_live_31893b86ab1a4231be2c893453cbac9b' }} );

        if(!response.ok) return;

        const data = await response.json();

        console.log(data);

        const countries: CountryData[] = data.data.objects.map((country:any) => jsonNormalization(country))
        console.log(countries)
    } catch(error){

    }
}