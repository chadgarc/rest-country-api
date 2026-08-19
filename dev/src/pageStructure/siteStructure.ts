/**
 * Initializes the application by injecting the navigation bar,
 * loading the saved theme preference, and attaching the theme
 * toggle listener.
 *
 * This module:
 * - Prepends the navigation bar to the `<body>`
 * - Loads the previously selected theme (light/dark)
 * - Listens for changes on the theme checkbox and applies
 *   the corresponding theme using `themeToggle()`
 *
 * @example
 * // Called automatically when the module is imported
 */
import { nav, checkTheme } from "../components/top";
import { themeToggle, loadThemeState } from "../components/themeController";

const body = document.getElementById('body') as HTMLBodyElement;

body.prepend(nav);

// Will load theme preference, if it doens't exist the defauld will be light
loadThemeState()

checkTheme.addEventListener('change', () =>{
    if(checkTheme.checked){
        themeToggle(true);
    } else {
        themeToggle(false);
    }
})


