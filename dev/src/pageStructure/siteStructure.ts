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


