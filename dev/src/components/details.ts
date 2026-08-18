import type { CountryData } from "../entities/country";
import { getCountry } from "../main";

export const detailPost = (country: CountryData) => {

    const borderCountries: string[] = []

    country.borderCountries.forEach(code => borderCountries.push(getCountry(code)?.name ?? ''));

    const container = document.createElement('div') as HTMLElement;
    container.className = 'flex flex-1 flex-col lg:flex-row md:h-95 gap-10 justify-between lg:justify-around mt-10'

    container.innerHTML = `
        <div class='w-97 xl:w-130 aspect-3/2 mx-auto hover-3d'>

        <figure class="">
            <img class='w-full aspect-3/2' src="${country.flagRoute}" alt="Flag of ${country.name}" />
        </figure>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>

        <section class="sm:justify-around sm:mx-auto">
            <h2 class='countryTitle ms-[1%] sm:ms-0'>${country.name}</h2>
            <section class='flex flex-col sm:flex-row sm:gap-25 mt-5 ms-[1%] sm:ms-0'>
                <article class='flex flex-col gap-2 mb-2'>
                    <p>Native Name: <span>${country.nativeName}</span></p>
                    <p>Population: <span>${country.population}</span></p>
                    <p>Region: <span>${country.region}</span></p>
                    <p>Sub Region: : <span>${country.subRegion}</span></p>
                    <p>Capital: <span>${country.capital.join(', ')}</span></p>
                </article>
                <article class='flex flex-col gap-2'>
                    <p>Top Level Domain: <span>${country.domain}</span></p>
                    <p>Currencies: <span>${country.currencies.join(', ')}</span></p>
                    <p>Languages: <span>${country.languages.join(', ')}</span></p>
                </article>
            </section>
            <section class="flex flex-col sm:flex-row mt-6 sm:mt-15 gap-2 items-start sm:items-center ms-[1%] sm:ms-0">
                <p class='mb-2 sm:mb-0'>Border Countries: </p>
                <div class="flex flex-wrap justify-start gap-2">
                    ${countriesStack(borderCountries).innerHTML}
                </div>
            <section>
        </section>
    `

    return container;
}

const countriesStack = (countries: string[]) => {
    const stack = document.createElement('div');
    countries.forEach( country => {
        const countryContainer = document.createElement('div');
        countryContainer.className = 'countryStack shadow-lg flex items-center justify-center';
        countryContainer.textContent = country;
        stack.appendChild(countryContainer);
    })
    return stack;
}