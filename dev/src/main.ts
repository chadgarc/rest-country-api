import { searchBar } from "./components/searchBar";
import { dropList } from "./components/dropDownList";
import { detailPost } from "./components/details";
import type { CountryData } from "./entities/country";
import { countryList } from "./components/countryList";
import { getSetCountries } from "./services/apiservices";

// Activate every 24h to make it work
// https://cors-anywhere.herokuapp.com/corsdemo

export let countries: CountryData[] = [];

const saved = localStorage.getItem('countries');

if(saved && saved.length){
    countries = JSON.parse(saved);
} else{
    countries.push(...await getSetCountries(100));
    countries.push(...await getSetCountries(100,100));
    countries.push(...await getSetCountries(100,200));
    localStorage.setItem('countries',JSON.stringify(countries))
}

const defaultCountries = ['DEU','USA','BRA','ISL','AFG','ALA','ALB','DZA'];
const defaultHomeCountries: CountryData[] = [];

const targetCountries = countries.filter(c =>
    defaultCountries.includes(c.code)
);

defaultCountries.forEach(code => {
    const found = targetCountries.find(c => c.code === code);
    if (found) defaultHomeCountries.push(found);
});


let previousState: CountryData[] = defaultHomeCountries;

export const getCountry = (code:string, countryList: CountryData[] = countries) => countryList.find( country => country.code === code )

const searchFilterSection = document.getElementById('searchFilter') as HTMLElement;
const contentContainer = document.getElementById('content') as HTMLElement;
const backButton = document.createElement('button') as HTMLButtonElement;
const searchElement = searchBar('Search for a country...') as HTMLElement;
const searchInput = searchElement.querySelector('input') as HTMLInputElement;

const contentAllCountriesSettings: string[] = ['grid','grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]']
const regions: string[] = ['Africa', 'Americas','Asia', 'Europe', 'Oceania', 'Reset Filter'];
let region = regions[5];
const [dropListBtn, dropListOptions] = dropList('Filter by Region',1,regions)

function renderCountryList(countries: CountryData[], change: boolean = false){
    if(change) {
        searchFilterSection.innerHTML = '';
        searchFilterSection.appendChild(searchElement);
        searchFilterSection.appendChild(dropListBtn);
        searchFilterSection.appendChild(dropListOptions);
    }
    contentContainer.innerHTML = '';
    contentContainer.classList.add(contentAllCountriesSettings[0]);
    contentContainer.classList.add(contentAllCountriesSettings[1]);
    
    
    countryList(countries).map( card => contentContainer.appendChild(card));
    
}

function renderCountryDetails(country:CountryData) {
    searchFilterSection.innerHTML = '';
    contentContainer.innerHTML = '';
    contentContainer.classList.remove(contentAllCountriesSettings[0]);
    contentContainer.classList.remove(contentAllCountriesSettings[1]);
    
    backButton.className = 'btn backBtn mt-7 mb-9 ms-9';
    backButton.innerHTML = `
    <svg class="h-6 w-6 fill-current" viewBox="0 -960 960 960">
    <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
    </svg>
    
    <span">Back<span>`
    
    searchFilterSection.appendChild(backButton);
    
    
    contentContainer.appendChild(detailPost(country));
}

backButton.addEventListener('click', () => {
    renderCountryList(previousState, true);
});

contentContainer.addEventListener('click', event => {
    const card = (event.target as HTMLElement).closest('.card') as HTMLElement;
    
    if(!card) return;
    
    const code: string = card.dataset.code ?? '';
    const country = getCountry(code);
    
    if (country) {
        renderCountryDetails(country);
    }
});

searchInput.addEventListener('input', () => {
    const reset = regions[5]
    const query = searchInput.value.trim()
    let target: CountryData[] = []
    if(query === '' && region === reset) target = defaultHomeCountries;
    else if(query === '') target = countries.filter( country => country.region === region);
    else if (region === reset) target = countries.filter( country => country.name.toLowerCase().includes(query));
    else target = countries.filter( country => country.region === region && country.name.toLowerCase().includes(query));
    previousState = target;
    renderCountryList(target);
});

dropListOptions.addEventListener('click', event => {
    const option = (event.target as HTMLElement).closest('a') as HTMLElement;
    if (!option) return;

    region = option.dataset.region || ''; // Africa, Europe, etc.

    if(region !== regions[5]){
        const filtered = countries.filter(country => country.region === region);
        previousState = filtered;
    } else{
        previousState = defaultHomeCountries;
    }
    renderCountryList(previousState);
});

renderCountryList(defaultHomeCountries, true);