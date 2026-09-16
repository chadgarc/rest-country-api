import { Link } from "react-router-dom";
import type { CountryData } from "../../types";
import { formatPopulation } from "../../modules/utils";

/**
 * Props for the `Card` component.
 *
 * @interface CardProps
 * @property {CountryData} country - The country data to display.
 */
interface CardProps {
    country: CountryData;
}

/**
 * Individual country card component.
 * Renders a clickable card with the country's flag and basic info.
 * Links to the country detail page via `to={`/${country.code}`}`.
 * Displays formatted population via `formatPopulation`.
 *
 * @param {CardProps} props - Component props.
 * @param {CountryData} props.country - The country data to display.
 * @returns {JSX.Element} The clickable country card element.
 *
 * @see {@link src/modules/utils} for `formatPopulation` utility.
 */
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
                    <figure></figure>
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
