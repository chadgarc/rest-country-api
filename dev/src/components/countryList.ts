import type { CountryData } from "../entities/country";
import { card } from "./card";

/**
 * Generates an array of country card components based on a list of
 * normalized country objects. Each card is created using the `card`
 * component and returned as a ready-to-render DOM element.
 *
 * This function does not append elements to the DOM; it only returns
 * the generated components so the caller can decide where and how to
 * render them. This makes the function reusable and easy to integrate
 * into different UI layouts or views.
 *
 * @param {CountryData[]} countries - An array of normalized country
 * objects used to generate card components.
 *
 * @returns {HTMLElement[]} An array of `<div>` elements, each
 * representing a country card.
 *
 * @example
 * // Generate cards and append them to a container
 * const cards = countryList(countries);
 * cards.forEach(card => contentContainer.appendChild(card));
 */
export const countryList = (countries: CountryData[]): HTMLElement[] => {
    const cards = countries.map( country => {
        return card(country);
    });
    return cards;
}