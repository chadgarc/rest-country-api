import { Link } from "react-router-dom";
import type { CountryData } from "../types";
import { formatPopulation } from "../modules/utils";

interface CardProps {
    country: CountryData;
}

export const Card = ({ country }: CardProps) => {
    return (
        <Link to={`/${country.code}`} className="block mx-auto">
            <div className="hover-3d w-70 h-84 sm:w-80 md:w-60 shadow-lg mt-10 mb-5 rounded-[.6rem]" data-code={country.code}>
                <div className="card">
                    <div className="flex flex-col">
                        <img
                            className="w-full h-full md:h-34 aspect-3/2"
                            src={country.flagRoute}
                            alt={`${country.name}'s flag`}
                    />
                    <article className="card-body">
                        <div className="cardContent flex flex-col gap-1">
                            <h2 className="card-title">{country.name}</h2>
                            <p>Population: <span>{formatPopulation(country.population)}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Capital: <span>{country.capital}</span></p>
                        </div>
                        <div className="card-actions justify-end"></div>
                    </article>
                        </div>
                        <figure>
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

            </div>
        </Link>
    );
};
