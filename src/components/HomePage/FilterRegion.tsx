import type { Regions } from "../../types";
import { useDataContext } from "../../ContextsAndProviders/CountryData";

/**
 * Region filter dropdown component.
 * Renders a DaisyUI dropdown for filtering countries by region.
 * Uses `useDataContext()` to access `countryList`, `filterByRegion`, `searchTerm`, and `selectedRegion`.
 * Supports filtering by "All" or specific regions (Africa, Americas, Asia, Europe, Oceania).
 *
 * @returns {JSX.Element} The region filter dropdown element.
 */
export const FilterRegion = () => {
    const regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const { filterByRegion } = useDataContext();

    /**
     * Sets the region filter via `filterByRegion`.
     * Passing an empty string resets to null.
     *
     * @param {Regions | ''} region - The region to filter by, or empty string for "All".
     */
    const handleFilter = (region: Regions | '') => {
        filterByRegion(region);
    }
    return (
        <div className="dropdown w-50 btn border-black rounded-xl p-0 dark:hover:bg-white dark:hover:text-black">
            <details className="w-full">
                <summary>Filter by Region</summary>
                <ul className="details-list w-full">
                    {[null, ...regions].map(r => <li key={r ? r : 'Reset'}><a onClick={() => handleFilter(r as Regions | '')}>{r ? r : 'Reset'}</a></li>)}
                </ul>
            </details>
        </div>
    );
};
