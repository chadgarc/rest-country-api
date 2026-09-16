import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CountryData } from "../types";
import { useFetchData } from "../hooks/FetchData";
import rawDemoData from "../demoData/data.json";

export interface DataContextType {
    countryList: CountryData[];
    setCountryList: React.Dispatch<React.SetStateAction<CountryData[]>>;
    filteredCountries: CountryData[];
    filterData: (filter: string) => void;
    getCountryByCode: (code: string) => CountryData | undefined;
    loading: boolean;
}

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [countryList,setCountryList] = useState<CountryData[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
    const { fetchAllCountries, loading } = useFetchData();

    useEffect(() => {
        fetchAllCountries().then((countries) => {
            if (countries && countries.length > 0) {
                setCountryList(countries);
                setFilteredCountries(countries);
            } else {
                // Fallback a demoData local si la API o el proxy CORS fallan
                const normalizedDemo: CountryData[] = rawDemoData.map((item: any) => ({
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
                setCountryList(normalizedDemo);
                setFilteredCountries(normalizedDemo);
            }
        });
    }, [fetchAllCountries]);

    const filterData = useCallback((filter: string) => {
        setFilteredCountries(countryList.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase())));
    }, [countryList]);

    const getCountryByCode = useCallback((code: string) => countryList.find(country => country.code === code), [countryList]);

    return (
        <DataContext.Provider value={{countryList,setCountryList,filteredCountries, filterData, getCountryByCode, loading}}>
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
