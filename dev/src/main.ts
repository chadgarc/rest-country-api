import { searchBar } from "./components/searchBar";
import { dropList } from "./components/dropDownList";
import { detailPost } from "./components/details";

const searchFilterSection = document.getElementById('searchFilter') as HTMLElement;
const contentContainer = document.getElementById('content') as HTMLElement;

const contentAllCountriesSettings: string[] = ['grid','grid-cols-[repeat(auto-fit,minmax(25rem,1fr))]']
const regions: string[] = ['Africa', 'America','Asia', 'Europe', 'Oceania'];
const [dropListBtn, dropListOptions] = dropList('Filter by Region',1,regions)

function renderCountryList(){
    searchFilterSection.innerHTML = '';
    contentContainer.classList.add(contentAllCountriesSettings[0]);
    contentContainer.classList.add(contentAllCountriesSettings[1]);

    searchFilterSection.appendChild(searchBar('Search for a country...'));
    searchFilterSection.appendChild(dropListBtn);
    searchFilterSection.appendChild(dropListOptions);

}

function renderCountryDetails(country:string) {
    searchFilterSection.innerHTML = '';
    contentContainer.classList.remove(contentAllCountriesSettings[0]);
    contentContainer.classList.remove(contentAllCountriesSettings[1]);

    const button = document.createElement('button') as HTMLButtonElement;
    button.className = 'btn backBtn mt-7 mb-9 ms-9';

    searchFilterSection.appendChild(button);

    const demoEcuador = {
        name: "Ecuador",
        nativeName: "Ecuador",
        population: 17643060,
        region: "Americas",
        subRegion: "South America",
        capital: "Quito",
        domain: ".ec",
        currencies: ["USD"],
        languages: ["Spanish"],
        borderCountries: ["COL", "PER"],
        flagRoute: ''
    };
    contentContainer.appendChild(detailPost(demoEcuador));
}

renderCountryDetails('spain');
// renderCountryList();