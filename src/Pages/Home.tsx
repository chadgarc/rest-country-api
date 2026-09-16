import { useDataContext } from "../Contexts and Providers/CountryData";
import { SearchBar } from "../components/HomePage/SearchBar";
import { CountryList } from "../components/HomePage/CountryList";
import { FilterRegion } from "../components/HomePage/FilterRegion";

/**
 * Home page component.
 * Renders the search bar, region filter, and country list.
 * Uses `useDataContext()` to access `filteredCountries` and `countryList`.
 * Shows filtered results if the search input has content, otherwise shows all countries.
 *
 * @returns {JSX.Element} The home page element.
 */
export function Home() {
    const { filteredCountries, countryList } = useDataContext();
    const countriesToShow = filteredCountries.length > 0 ? filteredCountries : countryList;

    return (
        <section className="container mx-auto mt-5 px-4 sm:px-0">
            <section className="flex flex-col gap-3 items-center
                            md:flex-row md:mx-10 md:justify-between">
                <SearchBar searchMessage={"Search for a country..."} />
                <FilterRegion />
            </section>
            <CountryList countries={countriesToShow} />
        </section>
    )
}
