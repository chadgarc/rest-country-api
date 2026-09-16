import { Link } from "react-router-dom";
import type { CountryStackType } from "../types";

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
