import { searchBar } from "./components/searchBar";
import { dropList } from "./components/dropDownList";
import { detailPost } from "./components/details";
import type { CountryData } from "./entities/country";
import { countryList } from "./components/countryList";
import { getSetCountries } from "./services/apiservices";

// Activate every 24h to make it work
// https://cors-anywhere.herokuapp.com/corsdemo

let countries: CountryData[] = [];

const saved = localStorage.getItem('countries');

if(saved && saved.length){
    countries = JSON.parse(saved);
} else{
    countries.push(...await getSetCountries(100));
    countries.push(...await getSetCountries(100,100));
    countries.push(...await getSetCountries(100,200));
    localStorage.setItem('countries',JSON.stringify(countries))
}

const defaultHomeCountries = ['DEU','USA','BRA','ISL','AFG','ALA','ALB','DZA']
const defaultPages = () => { return countries.filter( country => defaultHomeCountries.includes(country.code))}


const searchFilterSection = document.getElementById('searchFilter') as HTMLElement;
const contentContainer = document.getElementById('content') as HTMLElement;
const backButton = document.createElement('button') as HTMLButtonElement;

const contentAllCountriesSettings: string[] = ['grid','grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]']
const regions: string[] = ['Africa', 'America','Asia', 'Europe', 'Oceania'];
const [dropListBtn, dropListOptions] = dropList('Filter by Region',1,regions)

function renderCountryList(countries: CountryData[]){
    searchFilterSection.innerHTML = '';
    contentContainer.innerHTML = '';
    contentContainer.classList.add(contentAllCountriesSettings[0]);
    contentContainer.classList.add(contentAllCountriesSettings[1]);

    searchFilterSection.appendChild(searchBar('Search for a country...'));
    searchFilterSection.appendChild(dropListBtn);
    searchFilterSection.appendChild(dropListOptions);

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


// For demo and testing
// let countries: CountryData[] = [
//     {
//         code: "DEU",
//         name: "Germany",
//         nativeName: ["Deutschland"],
//         population: 83240525,
//         region: "Europe",
//         subRegion: "Western Europe",
//         capital: ["Berlin"],
//         domain: ".de",
//         currencies: ["EUR"],
//         languages: ["German"],
//         borderCountries: ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"],
//         flagRoute: "https://flagcdn.com/w320/de.png"
//     },
//     {
//         code: "USA",
//         name: "United States",
//         nativeName: ["United States"],
//         population: 339996563,
//         region: "Americas",
//         subRegion: "North America",
//         capital: ["Washington D.C."],
//         domain: ".us",
//         currencies: ["USD"],
//         languages: ["English"],
//         borderCountries: ["CAN", "MEX"],
//         flagRoute: "https://flagcdn.com/w320/us.png"
//     },
//     {
//         code: "BRA",
//         name: "Brazil",
//         nativeName: ["Brasil"],
//         population: 203062512,
//         region: "Americas",
//         subRegion: "South America",
//         capital: ["Brasília"],
//         domain: ".br",
//         currencies: ["BRL"],
//         languages: ["Portuguese"],
//         borderCountries: ["ARG", "BOL", "COL", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
//         flagRoute: "https://flagcdn.com/w320/br.png"
//     },
//     {
//         code: "ISL",
//         name: "Iceland",
//         nativeName: ["Ísland"],
//         population: 375318,
//         region: "Europe",
//         subRegion: "Northern Europe",
//         capital: ["Reykjavík"],
//         domain: ".is",
//         currencies: ["ISK"],
//         languages: ["Icelandic"],
//         borderCountries: [],
//         flagRoute: "https://flagcdn.com/w320/is.png"
//     },
//     {
//         code: "AFG",
//         name: "Afghanistan",
//         nativeName: ["افغانستان"],
//         population: 42239854,
//         region: "Asia",
//         subRegion: "Southern Asia",
//         capital: ["Kabul"],
//         domain: ".af",
//         currencies: ["AFN"],
//         languages: ["Pashto", "Dari"],
//         borderCountries: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
//         flagRoute: "https://flagcdn.com/w320/af.png"
//     },
//     {
//         code: "ALA",
//         name: "Åland Islands",
//         nativeName: [],
//         population: 30144,
//         region: "Europe",
//         subRegion: "Northern Europe",
//         capital: ["Mariehamn"],
//         domain: ".ax",
//         currencies: ["EUR"],
//         languages: ["Swedish"],
//         borderCountries: [],
//         flagRoute: "https://flagcdn.com/w320/ax.png"
//     },
//     {
//         code: "ALB",
//         name: "Albania",
//         nativeName: [],
//         population: 2837743,
//         region: "Europe",
//         subRegion: "Southern Europe",
//         capital: ["Tirana"],
//         domain: ".al",
//         currencies: ["ALL"],
//         languages: ["Albanian"],
//         borderCountries: ["MNE", "GRC", "MKD", "KOS"],
//         flagRoute: "https://flagcdn.com/w320/al.png"
//     },
//     {
//         code: "DZA",
//         name: "Algeria",
//         nativeName: [],
//         population: 45606404,
//         region: "Africa",
//         subRegion: "Northern Africa",
//         capital: ["Algiers"],
//         domain: ".dz",
//         currencies: ["DZD"],
//         languages: ["Arabic", "Berber"],
//         borderCountries: ["TUN", "LBY", "NER", "MLI", "MRT", "ESH", "MAR"],
//         flagRoute: "https://flagcdn.com/w320/dz.png",
//     }
// ];


backButton.addEventListener('click', () => {
    renderCountryList(defaultPages());
});

contentContainer.addEventListener('click', event => {
    const card = (event.target as HTMLElement).closest('.card') as HTMLElement;
    ;
    
    if(!card) return;
    
    const code = card.dataset.code;
    const country = countries.find(country => country.code === code);
    
    if (country) {
        renderCountryDetails(country);
    }
});

// renderCountryDetails(countries[0]);
renderCountryList(defaultPages());