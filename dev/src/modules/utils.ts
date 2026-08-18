
/**
 * Capitalize text
 * @param {string} text - text to capitalize.
 * @returns {string} text capitalized.
 */
export const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1,)}`;

export const compareStrings = (string1: string, string2: string): boolean => string1.toLowerCase() === string2.toLowerCase();