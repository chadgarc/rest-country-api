import { useState, useCallback } from "react";
import { jsonNormalization } from "../entities/country";
import type { CountryData } from "../types";
import demoData from "../demoData/data.json";

const API_URL = 'https://api.restcountries.com/countries/v5';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const TOKEN = 'rc_live_31893b86ab1a4231be2c893453cbac9b';
const DETAILS_PARAMS = 'response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png';

function hasNulls(data: any[]): boolean {
    return data && data.some((c: any) => c === null);
}

async function fetchAll(): Promise<CountryData[]> {
    try {
        const response = await fetch(`${CORS_PROXY}${API_URL}?limit=20&offset=0&${DETAILS_PARAMS}`, {
            method: "GET",
            headers: { 'Authorization': TOKEN }
        });
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();
        if (hasNulls(data.data.objects)) throw new Error('Data contains null entries');
        return data.data.objects.map((country: any) => jsonNormalization(country));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchByRegion(region: string): Promise<CountryData[]> {
    try {
        const response = await fetch(`${CORS_PROXY}${API_URL}?${region}`, {
            method: "GET",
            headers: { 'Authorization': TOKEN }
        });
        if (!response.ok) throw new Error('Failed to fetch region');
        const data = await response.json();
        if (hasNulls(data.data.objects)) throw new Error('Data contains null entries');
        return data.data.objects.map((country: any) => jsonNormalization(country));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

interface UseFetchDataReturn {
    fetchAllCountries: () => Promise<CountryData[]>;
    fetchByRegion: (region: string) => Promise<CountryData[]>;
    loading: boolean;
    error: string | null;
    countries: CountryData[];
}

export const useFetchData = (): UseFetchDataReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<CountryData[]>([]);

    const fetchAllCountries = useCallback(async (): Promise<CountryData[]> => {
        setLoading(true);
        setError(null);
        let result: CountryData[] = [];
        try {
            result = await fetchAll();
            setCountries(result);
        } catch {
            result = demoData as CountryData[];
            setCountries(result);
            setError('API returned insufficient data; using local backup');
        }
        setLoading(false);
        return result;
    }, []);

    const fetchByRegionFn = useCallback(async (region: string): Promise<CountryData[]> => {
        setLoading(true);
        setError(null);
        let result: CountryData[] = [];
        try {
            result = await fetchByRegion(region);
            setCountries(result);
        } catch {
            result = demoData as CountryData[];
            setCountries(result);
            setError('API returned insufficient data; using local backup');
        }
        setLoading(false);
        return result;
    }, []);

    return { fetchAllCountries, fetchByRegion: fetchByRegionFn, loading, error, countries };
};
