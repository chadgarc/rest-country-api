import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CountryData } from "../types";
import { useFetchData } from "../hooks/FetchData";
import rawDemoData from "../demoData/data.json";

const STORAGE_KEY = 'country-list';

/**
 * Interface representing the data context value provided by `DataProvider`.
 *
 * @interface DataContextType
 * @property {CountryData[]} countryList - Full list of all countries.
 * @property {React.Dispatch<React.SetStateAction<CountryData[]>>} setCountryList - Setter for countryList.
 * @property {CountryData[]} filteredCountries - Filtered list based on search.
 * @property {React.Dispatch<React.SetStateAction<CountryData[]>>} setFilteredCountries - Setter for filteredCountries.
 * @property {(filter: string) => void} filterData - Filters countries by name.
 * @property {(code: string) => CountryData | undefined} getCountryByCode - Looks up a country by its ISO code.
 * @property {boolean} loading - Whether an API fetch is in progress.
 * @property {boolean} initialLoading - Whether the initial data load is complete.
 */
export interface DataContextType {
    countryList: CountryData[];
    setCountryList: React.Dispatch<React.SetStateAction<CountryData[]>>;
    filteredCountries: CountryData[];
    setFilteredCountries: React.Dispatch<React.SetStateAction<CountryData[]>>;
    filterData: (filter: string) => void;
    getCountryByCode: (code: string) => CountryData | undefined;
    loading: boolean;
    initialLoading: boolean;
}

const defaultCountries = ['DEU','USA','BRA','ISL','AFG','ALA','ALB','DZA','ECU','COL'];

/**
 * React context for accessing country data throughout the application.
 * Defaults to `null` to enforce consumption within a `DataProvider`.
 *
 * @type {React.Context<DataContextType | null>}
 */
export const DataContext = createContext<DataContextType | null>(null);

/**
 * DataProvider component that wraps the application with country data context.
 * Implements a two-phase loading strategy with localStorage caching to
 * prevent route bugs on page reload.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that will have access to data context.
 * @returns {JSX.Element} The DataContext.Provider wrapping the children.
 */
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [countryList,setCountryList] = useState<CountryData[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const { fetchAllCountries, loading } = useFetchData();

    useEffect(() => {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            try {
                const parsed: CountryData[] = JSON.parse(cached);
                if (parsed.length > 0) {
                    setCountryList(parsed);
                    setFilteredCountries(parsed);
                }
            } catch {}
        }

        fetchAllCountries().then((countries) => {
            let data: CountryData[];
            if (countries && countries.length > 0) {
                data = countries;
            } else {
                data = rawDemoData.map((item: any) => ({
                    code: item.alpha3Code || item.alpha2Code || 'UNK',
                    name: item.name || 'Unknown',
                    nativeName: item.nativeName ? [item.nativeName] : ['N/A'],
                    population: item.population || 0,
                    region: item.region || 'N/A',
                    subRegion: item.subregion || 'N/A',
                    capital: item.capital ? [item.capital] : ['N/A'],
                    domain: item.topLevelDomain?.length ? item.topLevelDomain[0] : '',
                    currencies: item.currencies ? item.currencies.map((c: any) => c.code) : [],
                    languages: item.languages ? item.languages.map((l: any) => l.name) : [],
                    borderCountries: item.borders || [],
                    flagRoute: item.flags?.png || item.flag || ''
                }));
            }
            const defaultFetchedCountries = defaultCountries.map((code) => data.find((country) => country.code === code)) as CountryData[];
            const remainFetchedCountries = data.filter((country) => !defaultCountries.includes(country.code)) as CountryData[];
            const defaultHomeCountries: CountryData[] = [...defaultFetchedCountries, ...remainFetchedCountries];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFetchedCountries));
            setCountryList(defaultHomeCountries);
            setFilteredCountries(defaultHomeCountries);
            setInitialLoading(false);
        }).catch(() => {
            setInitialLoading(false);
        });
    }, [fetchAllCountries]);

    /**
     * Filters `countryList` by country name using case-insensitive matching.
     *
     * @param {string} filter - Search string to match against country names.
     */
    const filterData = useCallback((filter: string) => {
        setFilteredCountries(countryList.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase())));
    }, [countryList]);

    /**
     * Finds a country in `countryList` by its ISO alpha-3 code.
     *
     * @param {string} code - The ISO alpha-3 country code (e.g., "ESP").
     * @returns {CountryData | undefined} The matching country or `undefined` if not found.
     */
    const getCountryByCode = useCallback((code: string) => countryList.find(country => country.code === code), [countryList]);

    return (
        <DataContext.Provider value={{countryList,setCountryList,filteredCountries, setFilteredCountries, filterData, getCountryByCode, loading, initialLoading}}>
            {children}
        </DataContext.Provider>
    )
}

/**
 * Custom hook to access the data context.
 * Must be called inside a `DataProvider` component.
 * Throws a descriptive error if used outside a provider.
 *
 * @returns {DataContextType} The data context value.
 */
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within DataProvider');
    }
    return context;
};
