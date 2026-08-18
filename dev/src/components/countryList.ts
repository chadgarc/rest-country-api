import type { CountryData } from "../entities/country";
import { card } from "./card";

export const countryList = (countries: CountryData[]): HTMLElement[] => {
    const cards = countries.map( country => {
        return card(country);
    });
    return cards;
}