import { useParams } from "react-router-dom";
import { useDataContext } from "../Contexts and Providers/CountryData";
import { Details } from "../components/DetailPage/Details";

/**
 * Details page component.
 * Renders the `Details` component for a specific country identified
 * by the URL parameter `countryCode`.
 * Uses `useDataContext()` to look up the country by its ISO code.
 * Displays a "Country not found" message if the country does not exist.
 *
 * @returns {JSX.Element} The details page element.
 */
export function DetailsPage() {
    const { countryCode } = useParams<{ countryCode: string }>();
    const { getCountryByCode } = useDataContext();

    const country = countryCode ? getCountryByCode(countryCode) : undefined;

    if (!country) {
        return <div className="container mx-auto mt-10">Country not found</div>;
    }

    return (
        <section className="container mx-auto mt-5 px-4 sm:px-0">
            <Details />
        </section>
    );
}
