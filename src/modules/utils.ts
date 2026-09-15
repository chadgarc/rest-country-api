
/**
 * Capitalizes a given string by converting its first character
 * to uppercase and leaving the rest unchanged.
 *
 * This function does not modify the original string; it returns
 * a new capitalized version.
 *
 * @param {string} text - The text to capitalize.
 * @returns {string} The capitalized text.
 *
 * @example
 * capitalize("hello"); // "Hello"
 * capitalize("world"); // "World"
 */
export const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1,)}`;

/**
 * Compares two strings in a case-insensitive manner.
 *
 * Both strings are converted to lowercase before comparison,
 * ensuring that differences in capitalization do not affect
 * the result.
 *
 * @param {string} string1 - The first string to compare.
 * @param {string} string2 - The second string to compare.
 * @returns {boolean} True if both strings match (ignoring case),
 * otherwise false.
 *
 * @example
 * compareStrings("Hello", "hello"); // true
 * compareStrings("World", "WORLD"); // true
 * compareStrings("Test", "Taste");  // false
 */
export const compareStrings = (string1: string, string2: string): boolean => string1.toLowerCase() === string2.toLowerCase();

/**
 * Formats a population number using the German locale ("de-DE"),
 * inserting dots as thousand separators. This provides a clean,
 * human‑readable representation commonly used in many European
 * and Latin American formatting standards.
 *
 * @param {number} population - The numeric population value to format.
 * @returns {string} The formatted population string with thousand separators.
 *
 * @example
 * formatPopulation(1234567); // "1.234.567"
 * formatPopulation(980);     // "980"
 */
export const formatPopulation = (population:number) => population.toLocaleString('de-DE');