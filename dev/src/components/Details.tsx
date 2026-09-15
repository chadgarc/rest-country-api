import { CountryStack } from "./CountryStack";
import type { CountryData } from "../types";
import { formatPopulation } from "../modules/utils";
import { useDataContext } from "../Contexts/CountryData";

interface DetailsProps {
    country: CountryData;
}

export const Details = ({ country }: DetailsProps) => {
    const { getCountryByCode } = useDataContext()!;
    const borderCountries: string[] = country.borderCountries.map(code => getCountryByCode(code)?.name ?? '');

    return (
        <div className="flex flex-1 flex-col lg:flex-row md:h-95 gap-10 justify-between lg:justify-around mt-10">
            <div className="w-97 xl:w-130 aspect-3/2 mx-auto hover-3d">
                <figure className="">
                    <img className="w-full aspect-3/2" src={country.flagRoute} alt={`Flag of ${country.name}`} />
                </figure>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <section className="sm:justify-around sm:mx-auto">
                <h2 className="countryTitle ms-[1%] sm:ms-0">{country.name}</h2>
                <section className="flex flex-col sm:flex-row sm:gap-25 mt-5 ms-[1%] sm:ms-0">
                    <article className="flex flex-col gap-2 mb-2">
                        <p>Native Name: <span>{country.nativeName}</span></p>
                        <p>Population: <span>{formatPopulation(country.population)}</span></p>
                        <p>Region: <span>{country.region}</span></p>
                        <p>Sub Region: : <span>{country.subRegion}</span></p>
                        <p>Capital: <span>{country.capital.join(', ')}</span></p>
                    </article>
                    <article className="flex flex-col gap-2">
                        <p>Top Level Domain: <span>{country.domain}</span></p>
                        <p>Currencies: <span>{country.currencies.join(', ')}</span></p>
                        <p>Languages: <span>{country.languages.join(', ')}</span></p>
                    </article>
                </section>
                <section className="flex flex-col sm:flex-row mt-6 sm:mt-15 gap-2 items-start sm:items-center ms-[1%] sm:ms-0">
                    <p className="mb-2 sm:mb-0">Border Countries: </p>
                    <div className="flex flex-wrap justify-start gap-2">
                        {<CountryStack countries={borderCountries} />}
                    </div>
                </section>
            </section>
        </div>
    );
};
