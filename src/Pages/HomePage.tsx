import { useDataContext } from "../ContextsAndProviders/CountryData";
import { SearchBar } from "../components/HomePage/SearchBar";
import { CountryList } from "../components/HomePage/CountryList";
import { FilterRegion } from "../components/HomePage/FilterRegion";

/**
 * Home page component.
 * Renders the search bar, region filter, and country list.
 * Uses `useDataContext()` to access `filteredCountries`.
 * Shows default featured countries when no filter is active,
 * or filtered results when search or region is active.
 *
 * @returns {JSX.Element} The home page element.
 */
export function HomePage() {
    const { filteredCountries } = useDataContext();

    return (
        <section className="container mx-auto mt-5 px-4 sm:px-0">
            <section className="flex flex-col gap-3 items-center
                            md:flex-row md:mx-10 md:justify-between">
                <SearchBar searchMessage={"Search for a country..."} />
                <FilterRegion />
            </section>
            <CountryList countries={filteredCountries} />
        </section>
    )
}
