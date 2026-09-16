import type { CountryData } from "../../types";
import { Card } from "./Card";

/**
 * Props for the `CountryList` component.
 *
 * @interface CountryListProps
 * @property {CountryData[]} countries - Array of countries to display.
 */
interface CountryListProps {
    countries: CountryData[];
}

/**
 * Country list component with responsive grid.
 * Renders a grid of `Card` components for each country.
 * Uses Tailwind's `md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]`
 * for automatic responsive column adjustment.
 *
 * @param {CountryListProps} props - Component props.
 * @param {CountryData[]} props.countries - Array of countries to display.
 * @returns {JSX.Element} The responsive grid of country cards.
 *
 * @see {@link src/components/Card.tsx} for individual card rendering.
 */
export const CountryList = ({ countries }: CountryListProps) => {
    return (
        <section className="grid md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
            {countries.filter(Boolean).map((country) => (
                <Card key={country.code} country={country} />
            ))}
        </section>
    );
};
