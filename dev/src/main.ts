import { searchBar } from "./components/searchBar";
import { dropList } from "./components/dropDownList";

const searchFilterSection = document.getElementById('searchFilter') as HTMLElement;

let regions: string[] = ['Africa', 'America','Asia', 'Europe', 'Oceania'];
searchFilterSection.appendChild(searchBar('Search for a country...'));
const [dropListBtn, dropListOptions] = dropList('Filter by Region',1,regions)
searchFilterSection.appendChild(dropListBtn);
searchFilterSection.appendChild(dropListOptions);

