import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CountryData } from "../types";
import { useFetchData } from "../hooks/FetchData";

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
            setCountryList(countries);
            setFilteredCountries(countries);
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
