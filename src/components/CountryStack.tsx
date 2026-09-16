import { Link } from "react-router-dom";
import type { CountryStackType } from "../types";

export const CountryStack = ({ countrySet }: CountryStackType) => {
    return (
        <div>
            {countrySet.map((country) => (
                <Link to={`/${country.countryCode}`}>
                <div key={country.countryCode} className="countryStack shadow-lg flex items-center justify-center">
                    {country.countryName}
                </div>
                </Link>
            ))}
        </div>
    );
};
