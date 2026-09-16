import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CountryData } from "../types";
import { useFetchData } from "../hooks/FetchData";
import rawDemoData from "../demoData/data.json";

const STORAGE_KEY = 'country-list';

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

export const DataContext = createContext<DataContextType | null>(null);

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
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setCountryList(data);
            setFilteredCountries(data);
            setInitialLoading(false);
        }).catch(() => {
            setInitialLoading(false);
        });
    }, [fetchAllCountries]);

    const filterData = useCallback((filter: string) => {
        setFilteredCountries(countryList.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase())));
    }, [countryList]);

    const getCountryByCode = useCallback((code: string) => countryList.find(country => country.code === code), [countryList]);

    return (
        <DataContext.Provider value={{countryList,setCountryList,filteredCountries, setFilteredCountries, filterData, getCountryByCode, loading, initialLoading}}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within DataProvider');
    }
    return context;
};
