import { useDataContext } from "../Contexts/CountryData";
import { SearchBar } from "../components/SearchBar";
import { CountryList } from "../components/CountryList";
import { FilterRegion } from "../components/FilterRegion";

export function Home() {
    const { filteredCountries, countryList } = useDataContext();
    const countriesToShow = filteredCountries.length > 0 ? filteredCountries : countryList;

    return (
        <section className="container mx-auto mt-5 px-4 sm:px-0">
            <section className="flex justify-between mx-10">
            <SearchBar searchMessage={"Search for a country..."} />
            <FilterRegion />
            </section>
            <CountryList countries={countriesToShow} />
        </section>
    )
}
