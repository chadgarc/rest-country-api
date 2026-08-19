import { themeButton } from "./themeController";

/**
 * Creates a themed `<span>` element used to display the current theme
 * label (e.g., "Light Mode", "Dark Mode") inside the navigation bar.
 *
 * The span receives:
 * - A unique ID based on the theme name (e.g., "light-theme")
 * - Tailwind/DaisyUI styling classes
 * - Optional visibility control via the `hidden` flag
 *
 * @param {string} theme - The theme identifier ("light" or "dark").
 * @param {string} description - The text displayed inside the span.
 * @param {boolean} [hidden=false] - Whether the span should start hidden.
 *
 * @returns {HTMLSpanElement} A configured `<span>` element.
 *
 * @example
 * const darkLabel = span("dark", "Dark Mode");
 * const lightLabel = span("light", "Light Mode", true);
 */
const span = (theme: string, description: string, hidden: boolean = false) => {
    const span = document.createElement('span');
    span.id = `${theme}-theme`;
    span.className = 'theme text-base font-sans font-medium';
    span.textContent = description;
    if(!hidden) {
        span.classList.add('text-white');
    }
    if(hidden) span.classList.add('hidden');
    return span;
}


/**
 * Creates the top navigation bar for the application, including:
 * - The main title
 * - The theme toggle button
 * - Theme status labels ("Light Mode", "Dark Mode")
 *
 * This component is responsible only for rendering the UI structure.
 * Theme logic (toggling, persistence, etc.) is handled externally by
 * the theme controller module.
 *
 * @param {string} title - The title displayed in the navigation bar.
 *
 * @returns {HTMLElement} A `<nav>` element representing the full top
 * navigation bar, ready to be inserted into the DOM.
 *
 * @example
 * const nav = top("Where in the world?");
 * document.body.prepend(nav);
 */
export const top = (title: string) => {

    const nav = document.createElement('nav');
    nav.className = 'navbar bg-base-100 h-20 shadow-sm';
    nav.innerHTML += `
        <header class="flex-1 ms-10">
            <a class="btn btn-ghost text-xl font-bold title">${title}</a>
        </header>
    `;

    const themeArea = document.createElement('div');
    themeArea.className = 'flex items-center gap-2 me-20 themeArea';
    const themeBtn = themeButton();
    themeArea.appendChild(themeBtn)
    themeArea.appendChild(span('light','Light Mode', true));
    themeArea.appendChild(span('dark','Dark Mode'));

    nav.appendChild(themeArea);

    return nav;
}

/**
 * The main navigation bar instance created by `top()`. Exported so
 * other modules can attach event listeners or query elements inside it.
 */
export const nav = top('Where in the world?');
/**
 * Reference to the theme toggle button inside the navigation bar.
 * Useful for attaching click listeners or reading its internal state.
 */
export const themeBtn = nav.querySelector("#themeToggle")
/**
 * Reference to the hidden checkbox inside the theme toggle button.
 * This checkbox controls the DaisyUI "swap" animation and theme state.
 */
export const checkTheme = themeBtn?.querySelector('input') as HTMLInputElement;
/**
 * Reference to the span that displays "Light Mode".
 * Initially hidden until the theme is toggled.
 */
export const darkSpan = nav.querySelector('#light-theme')
/**
 * Reference to the span that displays "Dark Mode".
 * Visible by default unless the theme is toggled.
 */
export const lightSpan = nav.querySelector('#dark-theme')
