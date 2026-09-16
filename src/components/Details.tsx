import { CountryStack } from "./CountryStack";
import { formatPopulation } from "../modules/utils";
import { useDataContext } from "../Contexts/CountryData";
import { useParams, useNavigate } from "react-router-dom";
import type { CountrySet} from "../types";

// interface DetailsProps {
//     country: CountryData;
// }

export const Details = () => {
    const { countryCode } = useParams<{ countryCode: string }>();
    const { getCountryByCode, initialLoading } = useDataContext()!;
    const country = getCountryByCode(countryCode);

    if (initialLoading) {
        return (
            <section className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl">Loading...</p>
            </section>
        );
    }

    if (!country) {
        throw new Error('Country not found');
    };
    const borderCountries: CountrySet[] = country.borderCountries.map(code => {
        return {
            countryName: getCountryByCode(code)?.name ?? '',
            countryCode: code
        }
    });

    const navigate = useNavigate();

    return (
        <section className="flex flex-col">
        
        <button onClick={() => navigate(-1)} className="btn flex justify-start mt-10 ms-10 border-gray-600 bg-[hsl(0, 100%, 100%)] hover:bg-black hover:text-white w-20 h-10">Back</button>

        <div className="flex flex-1 flex-col lg:flex-row gap-10 justify-between lg:justify-around mt-10">
            <div className="w-97 aspect-3/2 mx-auto hover-3d">
                <figure className="">
                    <img className="w-full aspect-3/2 shadow-2xl" src={country.flagRoute} alt={`Flag of ${country.name}`} />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {<CountryStack countrySet={borderCountries} />}
                    </div>
                </section>
            </section>
        </div>
        </section>
    );
};
