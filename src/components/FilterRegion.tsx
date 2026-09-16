import type { Regions } from "../types";
import { useDataContext } from "../Contexts/CountryData";
import { useEffect, useState } from "react";

export const FilterRegion = () => {
    const regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const { countryList, setFilteredCountries } = useDataContext();
    const [selectedRegion, setSelectedRegion] = useState(() => sessionStorage.getItem('filterRegion') || 'All');

    useEffect(() => {
        sessionStorage.setItem('filterRegion', selectedRegion);
        const region = selectedRegion === 'All' ? '' : selectedRegion;
        const filtered = region ? countryList.filter((c) => c.region === region) : countryList;
        setFilteredCountries(filtered);
    }, [selectedRegion, countryList]);

    const handleFilter = (region: Regions | '') => {
        setSelectedRegion(region || 'All');
    }
    return (
        <div className="dropdown w-50 btn border-black rounded-xl p-0 dark:hover:bg-white dark:hover:text-black">
            <details className="w-full">
                <summary>Filter by Region</summary>
                <ul className="details-list w-full">
                    {['All', ...regions].map(r => <li key={r}><a onClick={() => handleFilter(r as Regions | '')} className={selectedRegion === r ? 'font-bold' : ''}>{r}</a></li>)}
                </ul>
            </details>
        </div>
    );
};
