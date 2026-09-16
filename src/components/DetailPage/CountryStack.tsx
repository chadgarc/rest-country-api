import { Link } from "react-router-dom";
import type { CountryStackType } from "../../types";

/**
 * Border countries stack component.
 * Renders a row of clickable tags for border countries.
 * Each tag is a `Link` to the border country's detail page.
 * Uses a React fragment (`<>...</>`) so each `countryStack` element
 * is a direct child of the grid container.
 *
 * @param {CountryStackType} props - Component props.
 * @param {CountrySet[]} props.countrySet - Array of border country objects.
 * @returns {JSX.Element} The row of border country tags.
 *
 * @see {@link src/css/main.scss} for `.countryStack` styles.
 */
export const CountryStack = ({ countrySet }: CountryStackType) => {
    return (
        <>
            {countrySet.map((country) => (
                <Link key={country.countryCode} to={`/${country.countryCode}`}>
                    <div className="countryStack shadow-lg flex items-center justify-center">
                        {country.countryName}
                    </div>
                </Link>
            ))}
        </>
    );
};
