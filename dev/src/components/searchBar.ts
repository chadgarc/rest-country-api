
/**
 * Creates a search bar component consisting of a label wrapper,
 * a search icon (SVG), and an input field. This component is used
 * to filter countries in the main view of the application.
 *
 * The returned element contains:
 * - A DaisyUI/Tailwind-styled label wrapper
 * - A magnifying glass SVG icon
 * - A search input with a customizable placeholder message
 *
 * The input is assigned the ID `searchEntries` so external logic
 * (e.g., event listeners) can easily attach behavior to it.
 *
 * @param {string} searchMessage - The placeholder text displayed inside
 * the search input field.
 *
 * @returns {HTMLElement} A `<label>` element containing the search bar,
 * ready to be inserted into the DOM.
 *
 * @example
 * const search = searchBar("Search for a country...");
 * searchFilterSection.appendChild(search);
 */
export const searchBar = (searchMessage: string): HTMLElement => {
    const bar = document.createElement('label');
    bar.className = 'input searchInput';
    bar.innerHTML = `
        <svg class="h-[1.3em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>

        <input id='searchEntries' class='ps-4' type="search" required placeholder="${searchMessage}" />
    `;
    return bar;
}