import type { CountryData } from "../types";
import { Card } from "./Card";

interface CountryListProps {
    countries: CountryData[];
}

export const CountryList = ({ countries }: CountryListProps) => {
    return (
        <section className="grid md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
            {countries.filter(Boolean).map((country) => (
                <Card key={country.code} country={country} />
            ))}
        </section>
    );
};
