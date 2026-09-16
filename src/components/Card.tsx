import { Link } from "react-router-dom";
import type { CountryData } from "../types";
import { formatPopulation } from "../modules/utils";

interface CardProps {
    country: CountryData;
}

export const Card = ({ country }: CardProps) => {
    return (
        <Link to={`/${country.code}`} className="block">
            <div className="card w-85 h-85 md:w-60 shadow-lg mt-10 mb-5 mx-auto rounded-[.6rem]" data-code={country.code}>
                <div className="hover-3d md:h-34 aspect-3/2">
                    <figure>
                        <img
                            className="w-full h-full cardTopLeft cardTopRight"
                            src={country.flagRoute}
                            alt={`${country.name}'s flag`}
                        />
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
        </Link>
    );
};
