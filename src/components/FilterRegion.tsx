import type { Regions } from "../types";
import { useDataContext } from "../Contexts/CountryData";



export const FilterRegion = () => {
    const regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const { countryList, setFilteredCountries } = useDataContext();

    const handleFilter = (region: Regions | '') => {
        const filteredCountries = countryList.filter((country) => country.region === region);
        setFilteredCountries(filteredCountries);
    }
    return (
        <div className="dropdown w-50 btn border-black rounded-xl p-0 dark:hover:bg-white dark:hover:text-black">
            <details className="w-full">
                <summary>Filter by Region</summary>
                <ul className="details-list w-full">
                    {['All', ...regions].map(r => <li key={r}><a onClick={() => handleFilter(r as Regions | '')}>{r}</a></li>)}
                </ul>
            </details>
        </div>
    );
};
