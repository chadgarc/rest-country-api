import { themeButton } from "./themeController";

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

export const top = (title: string) => {

    const nav = document.createElement('nav');
    nav.className = 'navbar bg-base-100 h-20 shadow-sm';
    nav.innerHTML += `
        <header class="flex-1 ms-10">
            <a class="btn btn-ghost text-xl font-bold title">${title}</a>
        </header>
    `;

    const themeArea = document.createElement('div');
    themeArea.className = 'flex items-center gap-2 me-20';
    const themeBtn = themeButton();
    themeArea.appendChild(themeBtn)
    themeArea.appendChild(span('light','Light Mode', true));
    themeArea.appendChild(span('dark','Dark Mode'));

    nav.appendChild(themeArea);

    return nav;
}

export const nav = top('Where in the world?');
export const themeBtn = nav.querySelector("#themeToggle")
export const checkTheme = themeBtn?.querySelector('input') as HTMLInputElement;
export const darkSpan = nav.querySelector('#light-theme')
export const lightSpan = nav.querySelector('#dark-theme')
