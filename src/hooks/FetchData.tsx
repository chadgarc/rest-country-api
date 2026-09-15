import { useState, useCallback } from "react";
import { jsonNormalization } from "../entities/country";
import type { CountryData } from "../types";

const API_URL = 'https://api.restcountries.com/countries/v5';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const TOKEN = 'rc_live_31893b86ab1a4231be2c893453cbac9b';
const DETAILS_PARAMS = 'response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png';

/**
 * Fetches all countries from the RestCountries API,
 * normalizes each result using `jsonNormalization()`.
 *
 * @returns {Promise<CountryData[]>} Array of normalized country objects.
 */
async function fetchAll(): Promise<CountryData[]> {
    try {
        const response = await fetch(`${CORS_PROXY}${API_URL}?limit=20&offset=0&${DETAILS_PARAMS}`, {
            method: "GET",
            headers: { 'Authorization': TOKEN }
        });
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        return data.data.objects.map((country: any) => jsonNormalization(country));
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Fetches all countries belonging to a specific region from the
 * RestCountries API, normalizes each result using `jsonNormalization()`.
 *
 * @param {string} region - Region name (e.g., "Europe", "Asia").
 * @returns {Promise<CountryData[]>} Array of normalized country objects for the region.
 */
async function fetchByRegion(region: string): Promise<CountryData[]> {
    try {
        const response = await fetch(`${CORS_PROXY}${API_URL}?${region}`, {
            method: "GET",
            headers: { 'Authorization': TOKEN }
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.data.objects.map((country: any) => jsonNormalization(country));
    } catch (error) {
        console.error(error);
        return [];
    }
}

interface UseFetchDataReturn {
    fetchAllCountries: () => Promise<CountryData[]>;
    fetchByRegion: (region: string) => Promise<CountryData[]>;
    loading: boolean;
    error: string | null;
    countries: CountryData[];
}

/**
 * Custom hook that provides data fetching capabilities for countries
 * from the RestCountries API. Manages loading, error, and country data
 * state internally.
 *
 * @returns {UseFetchDataReturn} Object containing fetch functions, loading state, error, and countries list.
 *
 * @example
 * const { fetchAllCountries, fetchByRegion, loading, error } = useFetchData();
 * useEffect(() => { fetchAllCountries(); }, []);
 */
export const useFetchData = (): UseFetchDataReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<CountryData[]>([]);

    const fetchAllCountries = useCallback(async (): Promise<CountryData[]> => {
        setLoading(true);
        setError(null);
        const result = await fetchAll();
        setCountries(result);
        setLoading(false);
        return result;
    }, []);

    const fetchByRegionFn = useCallback(async (region: string): Promise<CountryData[]> => {
        setLoading(true);
        setError(null);
        const result = await fetchByRegion(region);
        setCountries(result);
        setLoading(false);
        return result;
    }, []);

    return { fetchAllCountries, fetchByRegion: fetchByRegionFn, loading, error, countries };
};
