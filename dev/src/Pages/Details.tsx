import { useParams } from "react-router-dom";
import { useDataContext } from "../Contexts/CountryData";
import { Details } from "../components/Details";

export function DetailsPage() {
    const { countryCode } = useParams<{ countryCode: string }>();
    const { getCountryByCode } = useDataContext();

    const country = countryCode ? getCountryByCode(countryCode) : undefined;

    if (!country) {
        return <div className="container mx-auto mt-10">Country not found</div>;
    }

    return (
        <section className="container mx-auto mt-5 px-4 sm:px-0">
            <Details country={country} />
        </section>
    );
}
