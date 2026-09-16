import { useState, useCallback } from "react";
import type { CountryData } from "../types";
import rawDemoData from "../demoData/data.json";

function normalizeRaw(raw: any[]): CountryData[] {
    return raw.map((item: any) => ({
        code: item.alpha3Code || item.alpha2Code || 'UNK',
        name: item.name || 'Unknown',
        nativeName: item.nativeName ? [item.nativeName] : ['N/A'],
        population: item.population || 0,
        region: item.region || 'N/A',
        subRegion: item.subregion || 'N/A',
        capital: item.capital ? [item.capital] : ['N/A'],
        domain: item.topLevelDomain?.length ? item.topLevelDomain[0] : '',
        currencies: item.currencies?.map((c: any) => c.code) || [],
        languages: item.languages?.map((l: any) => l.iso639_1 || l.name) || [],
        borderCountries: item.borders || [],
        flagRoute: item.flags?.png || item.flag || ''
    }));
}

function hasNulls(data: CountryData[]): boolean {
    return data && data.some((c) => !c);
}

const demoData = normalizeRaw(rawDemoData as any[]);

async function fetchAll(): Promise<CountryData[]> {
    try {
        if (hasNulls(demoData)) throw new Error('Data contains null entries');
        return demoData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function fetchByRegion(region: string): Promise<CountryData[]> {
    try {
        if (hasNulls(demoData)) throw new Error('Data contains null entries');
        return demoData.filter((country) => country.region === region);
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
            result = demoData;
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
            result = demoData;
            setCountries(result);
            setError('API returned insufficient data; using local backup');
        }
        setLoading(false);
        return result;
    }, []);

    return { fetchAllCountries, fetchByRegion: fetchByRegionFn, loading, error, countries };
};
