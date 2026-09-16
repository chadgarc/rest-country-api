import { useState, useCallback } from "react";
import { jsonNormalization } from "../entities/country";
import type { CountryData } from "../types";

/**
 * Fetches all countries by dynamically importing the demo JSON data
 * and normalizing each entry via `jsonNormalization()`.
 *
 * @returns {Promise<CountryData[]>} Array of normalized country objects.
 */
async function fetchAll(): Promise<CountryData[]> {
  try {
    const response = await import('../countryData/data.json');
    return response.default.map((country: any) => jsonNormalization(country));
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetches countries belonging to a specific region by filtering the demo data
 * and normalizing each entry via `jsonNormalization()`.
 *
 * @param {string} region - The region name (e.g., "Europe", "Asia").
 * @returns {Promise<CountryData[]>} Array of normalized country objects for the region.
 */
async function fetchByRegion(region: string): Promise<CountryData[]> {
  try {
    const response = await import(`../countryData/data.json`);
    const regionData = response.default.filter((country: any) => country.region.toLowerCase() === region.toLowerCase());
    return regionData.map((country: any) => jsonNormalization(country));
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface UseFetchDataReturn {
    /** Fetches all countries. */
    fetchAllCountries: () => Promise<CountryData[]>;
    /** Fetches countries by region. */
    fetchByRegion: (region: string) => Promise<CountryData[]>;
    /** Whether a fetch is in progress. */
    loading: boolean;
    /** Error message if fetch failed, or null. */
    error: string | null;
    /** The last fetched country data. */
    countries: CountryData[];
}

/**
 * Custom hook that provides data fetching capabilities for countries.
 * Manages loading, error, and country data state internally.
 * Currently loads data from a local demo JSON file via dynamic import.
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

  const fetchByRegionFn = useCallback(
    async (region: string): Promise<CountryData[]> => {
      setLoading(true);
      setError(null);

      const result = await fetchByRegion(region);
      setCountries(result);

      setLoading(false);
      return result;
    },
    []
  );

  return {
    fetchAllCountries,
    fetchByRegion: fetchByRegionFn,
    loading,
    error,
    countries,
  };
};
