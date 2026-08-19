
/**
 * Creates an anchor (`<a>`) element used inside the dropdown list.
 * The anchor receives a `data-region` attribute so the caller can
 * attach filtering or navigation logic based on the selected item.
 *
 * @param {string} name - The text displayed inside the anchor and the
 * value assigned to `data-region`.
 *
 * @returns {HTMLAnchorElement} A configured `<a>` element.
 *
 * @example
 * const anchor = newAnchor("Europe");
 * li.appendChild(anchor);
 */
const newAnchor = (name:string) => {
    const anchor = document.createElement('a');
    anchor.dataset.region = name;
    anchor.textContent = name;
    return anchor;
}

/**
 * Creates a dropdown (popover-style) component using DaisyUI's popover
 * pattern. The component consists of two elements:
 *
 * 1. A button that toggles the popover.
 * 2. A list (`<ul>`) containing selectable items.
 *
 * Each item in the list is generated from the provided `list` array and
 * receives a `data-region` attribute, allowing the caller to attach
 * custom logic (e.g., filtering countries by region).
 *
 * This function returns both elements so the caller can decide where
 * to insert them in the DOM. The popover uses unique IDs and anchor
 * names based on `targetID`, ensuring multiple dropdowns can coexist
 * without conflicts.
 *
 * @param {string} title - The text displayed inside the dropdown button.
 * @param {number} targetID - A unique numeric identifier used to generate
 * popover IDs and anchor names (e.g., "popover-1", "--anchor-1").
 * @param {string[]} list - An array of strings used to populate the dropdown
 * items. Each string becomes an `<a>` element inside a `<li>`.
 *
 * @returns {HTMLElement[]} An array containing two elements:
 *  - The dropdown button (`<button>`)
 *  - The dropdown list (`<ul>`)
 *
 * @example
 * // Create a dropdown for filtering by region
 * const [button, list] = dropList("Filter by Region", 1, [
 *   "Africa",
 *   "Americas",
 *   "Asia",
 *   "Europe",
 *   "Oceania",
 *   "Reset Filter"
 * ]);
 *
 * searchFilterSection.appendChild(button);
 * searchFilterSection.appendChild(list);
 */
export const dropList = (title: string, targetID: number, list: string[]): HTMLElement[] => {
    const dropBtn = document.createElement('button');
    const ulList = document.createElement('ul');

    dropBtn.className = 'btn dropdownBtn';
    dropBtn.setAttribute("popovertarget", `popover-${targetID}`);
    dropBtn.style.anchorName = `--anchor-${targetID}`;
    dropBtn.innerHTML = `
        <span>${title}</span>
        <svg class="rotate-90 h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
        </svg>
        `;

    ulList.className = 'dropdownItems dropdown menu w-52 rounded-box bg-base-100 shadow-sm';
    ulList.setAttribute('popover','');
    ulList.id = `popover-${targetID}`;
    ulList.style.positionAnchor = `--anchor-${targetID}`

    list.forEach( item => {
        const li = document.createElement('li');
        
        li.appendChild(newAnchor(item));
        ulList.appendChild(li);
    });

    return [dropBtn,ulList];
}

