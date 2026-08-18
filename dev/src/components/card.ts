import type { CountryData } from "../entities/country";

export const card = (country: CountryData): HTMLElement => {
    const container = document.createElement('div') as HTMLElement;
    container.className = 'card w-85 md:w-60 shadow-lg mt-10 mb-5 mx-auto rounded-[.6rem]'
    container.dataset.code = country.code;
    container.innerHTML=`
        <div class="hover-3d md:h-34 aspect-3/2">
            <figure >
            <img
                class='w-full h-full cardTopLeft cardTopRight'
                src="${country.flagRoute}"
                alt="${country.name}'s flag"/>
            </figure>
            <!-- 8 empty divs needed for the 3D effect -->
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <article class="card-body">
            <div class='cardContent flex flex-col gap-1 '>
            <h2 class="card-title">${country.name}</h2>
            <p>Population: <span>${country.population}</span></p>
            <p>Region: <span>${country.region}</span></p>
            <p>Capital: <span>${country.capital}</span></p>
            </div>
            <div class="card-actions justify-end">
            </div>
        </article>
    `;
    return container;
}