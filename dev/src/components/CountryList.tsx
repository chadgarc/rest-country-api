import type { CountryData } from "../types";
import { Card } from "./Card";

interface CountryListProps {
    countries: CountryData[];
}

export const CountryList = ({ countries }: CountryListProps) => {
    return (
        <>
            {countries.map((country) => (
                <Card key={country.code} country={country} />
            ))}
        </>
    );
};
