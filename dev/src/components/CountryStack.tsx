interface CountryStackProps {
    countries: string[];
}

export const CountryStack = ({ countries }: CountryStackProps) => {
    return (
        <div>
            {countries.map((country) => (
                <div key={country} className="countryStack shadow-lg flex items-center justify-center">
                    {country}
                </div>
            ))}
        </div>
    );
};
