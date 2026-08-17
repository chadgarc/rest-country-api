
export const card = (imageSource: string, country: string, population: number, region: string, capital: string): HTMLElement => {
    const container = document.createElement('section') as HTMLElement;
    container.className = 'card bg-base-100 w-96 shadow-sm'
    container.innerHTML=`
        <figure>
            <img
                src="${imageSource}"
                alt="${country}'s flag"/>
        </figure>
        <article class="card-body">
            <h2 class="card-title">${country}</h2>
            <p>Population: ${population}</p>
            <p>Region: ${region}</p>
            <p>Capital: ${capital}</p>
            <div class="card-actions justify-end">
            </div>
        </article>
    `;
    return container;
}