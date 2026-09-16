/**
 * ============================================================
 * REST Countries API — Full Project Documentation
 * ============================================================
 *
 * This document provides a comprehensive explanation of the entire
 * application architecture, including hooks, contexts, data fetching,
 * localStorage integration, routing, and CSS theming.
 *
 * @module App-Architecture
 */

// ============================================================================
// SECTION 1: APPLICATION ENTRY POINT & ROUTING
// ============================================================================

/**
 * @fileoverview Main entry point of the application.
 *
 * @file src/main.tsx
 * @description Imports the main SCSS stylesheet (`./css/main.scss`) which
 *              contains all Tailwind CSS, DaisyUI, CSS variables, theme
 *              definitions, and component styles. Vite compiles SCSS at
 *              runtime using `sass-embedded`. Also imports `input.css`
 *              which contains the `@import "tailwindcss"` and `@plugin "daisyui"` directives.
 *
 * @see {@link src/css/main.scss}
 * @see {@link src/css/input.css}
 */

/**
 * @fileoverview Routing configuration.
 *
 * @file src/App.tsx
 * @description Uses `HashRouter` from `react-router-dom` to manage navigation.
 *              The hash-based routing (`#/path`) ensures that routes persist
 *              on page reload without requiring server-side configuration.
 *              The `data-theme` attribute is set on the wrapper div based on
 *              the current theme from `useThemeContext()`.
 *
 * Routes:
 * - `/` → `Layout` → `Home` (country search and listing)
 * - `/:countryCode` → `Layout` → `Details` (country detail page)
 *
 * @example
 * // URL on the home page:
 * http://localhost:3000/#/
 *
 * // URL on a country detail page:
 * http://localhost:3000/#/ESP
 */

/**
 * @fileoverview Layout wrapper component.
 *
 * @file src/Pages/Layout.tsx
 * @description Provides a consistent layout with a navigation bar (`Top`)
 *              and an `<Outlet>` for rendering child routes.
 */

// ============================================================================
// SECTION 2: DATA FETCHING HOOK — useFetchData
// ============================================================================

/**
 * @fileoverview Custom hook for fetching country data.
 *
 * @file src/hooks/FetchData.tsx
 *
 * @description
 * The `useFetchData` hook encapsulates all data fetching logic. It currently
 * loads country data from a local demo JSON file (`src/demoData/data.json`)
 * via dynamic `import()`, normalizing each entry through `jsonNormalization()`.
 * API-based fetching functions are retained but commented out.
 *
 * **How it works:**
 * 1. Maintains internal state: `loading`, `error`, `countries`.
 * 2. `fetchAllCountries()` calls the private `fetchAll()` async function, which:
 *    - Dynamically imports `../demoData/data.json`.
 *    - Maps each country object through `jsonNormalization()` to standardize the data format.
 *    - Returns a `Promise<CountryData[]>`.
 * 3. `fetchByRegion(region)` works similarly but filters by region.
 * 4. Both functions set `loading = true` before the request and `loading = false` after.
 *
 * @example
 * const { fetchAllCountries, fetchByRegion, loading, error } = useFetchData();
 * useEffect(() => { fetchAllCountries(); }, []);
 *
 * @returns {UseFetchDataReturn} Object with `fetchAllCountries`, `fetchByRegion`,
 *          `loading`, `error`, and `countries`.
 */

/**
 * @typedef {Object} UseFetchDataReturn
 * @property {() => Promise<CountryData[]>} fetchAllCountries - Fetches all countries.
 * @property {(region: string) => Promise<CountryData[]>} fetchByRegion - Fetches countries by region.
 * @property {boolean} loading - Whether a fetch is in progress.
 * @property {string | null} error - Error message if fetch failed.
 * @property {CountryData[]} countries - The last fetched country data.
 */

/**
 * @function fetchAll
 * @private
 * @description Makes the actual data retrieval by dynamically importing
 *              the demo JSON data and mapping each entry through
 *              `jsonNormalization()` to standardized `CountryData` objects.
 * @returns {Promise<CountryData[]>} Array of normalized country objects.
 */

/**
 * @function fetchByRegion
 * @private
 * @description Similar to `fetchAll` but filters by region.
 * @param {string} region - The region name (e.g., "Europe", "Asia").
 * @returns {Promise<CountryData[]>} Array of normalized country objects for the region.
 */

// ============================================================================
// SECTION 3: DATA NORMALIZATION — jsonNormalization & Country Class
// ============================================================================

/**
 * @fileoverview Data normalization and Country model.
 *
 * @file src/entities/country.ts
 *
 * @description
 * `jsonNormalization` converts raw API/demo data responses into the standardized
 * `CountryData` interface. It handles missing fields, inconsistent
 * structures, and optional values.
 *
 * The `Country` class implements `CountryData` and provides a
 * `displayDetails()` method for human-readable summaries.
 *
 * @see {@link src/types/index.ts} for the `CountryData` interface definition.
 */

/**
 * @function jsonNormalization
 * @description Normalizes raw country data into `CountryData` format.
 * @param {any} raw - The raw country object from the API or demo data.
 * @returns {CountryData} A fully normalized country data object.
 *
 * Normalization includes:
 * - Extracting ISO alpha-3 codes (`alpha3Code`)
 * - Mapping official names (`name`)
 * - Mapping native names from nested objects
 * - Mapping languages and currencies
 * - Providing fallback values when fields are unavailable
 */

// ============================================================================
// SECTION 4: TYPE DEFINITIONS
// ============================================================================

/**
 * @fileoverview TypeScript type definitions.
 *
 * @file src/types/index.ts
 *
 * @interface CountryData
 * @property {string} code - ISO alpha-3 country code
 * @property {string} name - Official country name
 * @property {string[]} nativeName - Native names in different languages
 * @property {number} population - Total population count
 * @property {string} region - Geographic region (e.g., "Europe")
 * @property {string} subRegion - Subregion (e.g., "Western Europe")
 * @property {string[]} capital - List of capital cities
 * @property {string} domain - Top-level domain (e.g., ".de")
 * @property {string[]} currencies - Currency codes
 * @property {string[]} languages - Language identifiers
 * @property {string[]} borderCountries - Neighboring country codes
 * @property {string} flagRoute - URL to the country's PNG flag
 *
 * @interface ThemeContextType
 * @property {'light' | 'dark'} theme - Current theme state
 * @property {() => void} toggleTheme - Function to toggle theme
 *
 * @interface CountrySet
 * @property {string} countryName - Name of the country
 * @property {string} countryCode - Country code
 *
 * @interface CountryStackType
 * @property {CountrySet[]} countrySet - Array of border country sets
 *
 * @type {Regions} Union type of valid region strings.
 */

// ============================================================================
// SECTION 5: DATA CONTEXT WITH LOCALSTORAGE — DataProvider
// ============================================================================

/**
 * @fileoverview Application data context with localStorage caching.
 *
 * @file src/Contexts/CountryData.tsx
 *
 * @description
 * `DataProvider` is a React Context that manages all country data throughout
 * the application. It implements a **two-phase loading strategy** with
 * `localStorage` caching to prevent route bugs on page reload.
 *
 * **The Problem (Before Fix):**
 * When the page is reloaded on a deep route like `#/country/ESP`, the
 * `HashRouter` correctly preserves the URL hash. However, `countryList`
 * starts as an empty array `[]`. The async data fetch takes time to complete.
 * During this window, `getCountryByCode('ESP')` returns `undefined`, causing
 * `throw new Error('Country not found')`.
 *
 * **The Solution (localStorage Caching):**
 * 1. On initialization, `DataProvider` checks `localStorage` for a cached
 *    country list using the key `'country-list'`.
 * 2. If cached data exists and is valid JSON, it is loaded into state
 *    immediately. This means `getCountryByCode()` works right away.
 * 3. Simultaneously, `fetchAllCountries()` is called to get fresh data.
 * 4. When fresh data arrives, a curated list of default countries is saved
 *    back to `localStorage` via `localStorage.setItem('country-list', JSON.stringify(data))`.
 * 5. State is updated with the curated list, and `initialLoading` is set to `false`.
 *
 * **How localStorage Works with Page Changes:**
 *
 * | Event | localStorage Behavior |
 * |-------|----------------------|
 * | Initial load (first visit) | `localStorage` is empty → shows loading state → fetches from demo data → caches default countries |
 * | Initial load (returning visitor) | `localStorage` has cached data → state is populated immediately → routes work instantly → also fetches fresh data in background |
 * | Page reload on `/:countryCode` | Cached data is loaded from `localStorage` → `getCountryByCode('ESP')` finds the country → `Details` renders correctly |
 * | Theme toggle (via ThemeContext) | `localStorage.setItem('theme', theme)` saves theme preference |
 * | Data updates (filter, etc.) | Only state changes; `localStorage` cache remains unchanged |
 *
 * **Key State Variables:**
 * - `countryList`: Full list of all countries (populated from cache or demo data)
 * - `defaultHomeCountries`: The featured/default countries (10 countries like DEU, USA, BRA, etc.)
 * - `filteredCountries`: Derived list — shows `defaultHomeCountries` when no filters active, otherwise filters `countryList`
 * - `searchTerm`: Current search query string (empty when no search is active)
 * - `selectedRegion`: Currently selected region filter (empty string "All" when no region filter is active)
 * - `initialLoading`: `true` while checking cache + fetching; `false` when ready
 * - `loading`: `true` while API request is in progress
 *
 * **How Search + Region Filters Compose:**
 * `filteredCountries` is computed as a derived value:
 * ```
 * if (searchTerm || selectedRegion):
 *   filteredCountries = countryList.filter(country =>
 *     (!searchTerm || country.name.includes(searchTerm)) &&
 *     (!selectedRegion || country.region === selectedRegion)
 *   )
 * else:
 *   filteredCountries = defaultHomeCountries  // featured countries only
 * ```
 * - On initial load: shows only the 10 featured/default countries
 * - When a search or region is active: shows all countries matching both filters
 * - When both filters are cleared: returns to showing only featured countries
 * - Clearing one filter does NOT affect the other
 *
 * **Why defaultHomeCountries exists:**
 * The user's main/default countries are the first thing visitors see.
 * The full `countryList` is kept in context so that searches and region
 * filters can search across ALL countries, but the default view is
 * curated to the featured countries only.
 *
 * @example
 * // On page reload, the user sees:
 * // 1. cached data is loaded instantly (no blank screen)
 * // 2. Route renders correctly (country found)
 * // 3. Fresh API data replaces cache when it arrives
 *
 * @type {React.Context<DataContextType | null>}
 */

/**
 * @interface DataContextType
 * @property {CountryData[]} countryList - Full list of all countries.
 * @property {CountryData[]} filteredCountries - Derived list filtered by both search term and region.
 * @property {(filter: string) => void} filterData - Sets the search term to filter by country name.
 * @property {(region: string) => void} filterByRegion - Sets the selected region to filter by region.
 * @property {(code: string) => CountryData | undefined} getCountryByCode - Looks up a country by its ISO code.
 * @property {string} searchTerm - Current search query.
 * @property {string} selectedRegion - Currently selected region filter.
 * @property {boolean} loading - Whether an API fetch is in progress.
 * @property {boolean} initialLoading - Whether the initial data load (cache + fetch) is complete.
 */

/**
 * @function filterData
 * @description Sets the search term to filter `countryList` by country name (case-insensitive).
 * This is a derived filter — combined with `filterByRegion` to compose both filters.
 * @param {string} filter - Search string to match against country names.
 */

/**
 * @function filterByRegion
 * @description Sets the selected region to filter `countryList` by region.
 * Passing an empty string `""` resets to show all regions.
 * Combined with `filterData` to compose both filters.
 * @param {string} region - The region to filter by (e.g., "Europe"), or "" for "All".
 */

/**
 * @function getCountryByCode
 * @description Finds a country in `countryList` by its ISO alpha-3 code.
 * @param {string} code - The ISO alpha-3 country code (e.g., "ESP").
 * @returns {CountryData | undefined} The matching country or `undefined` if not found.
 */

// ============================================================================
// SECTION 6: THEME CONTEXT WITH LOCALSTORAGE — ThemeProvider
// ============================================================================

/**
 * @fileoverview Theme management context with localStorage persistence.
 *
 * @file src/Contexts/ThemeContext.tsx
 *
 * @description
 * `ThemeProvider` manages light/dark mode across the application. It persists
 * the user's theme preference in `localStorage` so it survives page reloads.
 *
 * **How Theme Switching Works:**
 * 1. On initialization, reads `localStorage.getItem('theme')` to restore
 *    the previously saved theme (defaults to `'light'`).
 * 2. `useState` tracks the current theme value.
 * 3. `useEffect` saves the theme to `localStorage` whenever it changes:
 *    `localStorage.setItem('theme', theme)`.
 * 4. Sets `data-theme={theme}` on the wrapper div, which DaisyUI reads to
 *    apply theme-specific CSS variables.
 *
 * **CSS Theme Priority (from main.scss):**
 *
 * | Mechanism | CSS Selector | Priority |
 * |-----------|-------------|----------|
 * | System preference | `@media (prefers-color-scheme: dark)` | First priority for automatic theme |
 * | Manual toggle | `[data-theme="dark"]` | JS-controlled, overrides system when user explicitly chooses |
 *
 * **Color Variables (main.scss values):**
 * - Light mode: `--bg: #fff`, `--text: #191919`, `--text-h: #04000e`
 * - Dark mode (manual via `[data-theme]`): `--bg: black`, `--text: #ffffff`
 *
 * @example
 * // Theme is automatically restored on reload:
 * localStorage.getItem('theme') // returns 'dark' or 'light'
 *
 * @example
 * // Toggle function:
 * const { theme, toggleTheme } = useThemeContext();
 * toggleTheme(); // switches between 'light' and 'dark'
 */

// ============================================================================
// SECTION 7: CSS ARCHITECTURE — main.scss & input.css
// ============================================================================

/**
 * @fileoverview Main stylesheet containing all styles, CSS variables, and theme definitions.
 *
 * @file src/css/main.scss
 * @description This is the single entry point for all application styles. It contains:
 *
 * **1. Imports:**
 * - `@use 'fontNunito' as nunito` — SCSS module for Nunito Sans font variables
 *
 * **2. CSS Variables (`:root`):**
 * All theme colors are defined as CSS custom properties for both light and dark modes:
 * - `--text`, `--text-h`, `--bg`, `--border`, `--code-bg`, `--accent`, etc.
 * - `--input`, `--element` — used by components like `searchInput`, `card`, `countryStack`
 *
 * **3. Theme Definitions:**
 * - `[data-theme="dark"]` — Manual dark mode controlled by JS (DaisyUI + ThemeContext)
 *
 * **4. Base Styles:**
 * - `body`, `h1`, `h2`, `p` — Typography and reset styles
 * - `main`, `.background` — Layout background colors
 *
 * **5. Component Styles:**
 * - `.searchInput`, `.dropdownBtn`, `.dropdownItems`, `.dropdown`, `.details-list`
 * - `.card`, `.cardContent`, `.cardTitle`, `.card-body`
 * - `.countryStack` — Border country tags
 * - `.countryTitle`, `.title`, `.backBtn`
 *
 * **6. Responsive Design:**
 * - `@media (max-width: 550px)` — Adjusts font sizes and spacing for small screens
 * - `@media (max-width: 1024px)` — Adjusts root font size for tablets
 *
 * @file src/css/input.css
 * @description Contains the Tailwind CSS and DaisyUI plugin directives:
 * - `@import "tailwindcss"`
 * - `@plugin "daisyui"`
 *
 * @example
 * /* Country list grid behavior: *\/
 * /* Desktop (≥768px): auto-fit columns with minmax(20rem, 1fr) *\/
 * /* Mobile: single column *\/
 */

// ============================================================================
// SECTION 8: COMPONENT DOCUMENTATION
// ============================================================================

/**
 * @fileoverview Home page component.
 *
 * @file src/Pages/Home.tsx
 * @description Renders the search bar, region filter, and country list.
 *              Uses `useDataContext()` to access `filteredCountries` and `countryList`.
 *              Shows filtered results if the search input has content, otherwise shows all countries.
 *
 * @example
 * <section className="container mx-auto mt-5 px-4 sm:px-0">
 *     <SearchBar searchMessage={"Search for a country..."} />
 *     <FilterRegion />
 *     <CountryList countries={countriesToShow} />
 * </section>
 */

/**
 * @fileoverview Search bar component.
 *
 * @file src/components/SearchBar.tsx
 * @description A styled search input wrapped in a DaisyUI label.
 *              Implements debounced filtering (300ms) via `useRef` and `useEffect`.
 *              Passes `searchMessage` as the placeholder text.
 * @property {string} searchMessage - Placeholder text for the search input.
 */

/**
 * @fileoverview Country list component with responsive grid.
 *
 * @file src/components/CountryList.tsx
 * @description Renders a responsive grid of `Card` components for each country.
 *              Uses Tailwind's `md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]`
 *              for automatic responsive column adjustment.
 * @property {CountryData[]} countries - Array of countries to display.
 *
 * @see {@link src/components/Card.tsx} for individual card rendering.
 */

/**
 * @fileoverview Individual country card component.
 *
 * @file src/components/Card.tsx
 * @description Renders a clickable card with the country's flag and basic info.
 *              Links to the country detail page via `to={`/${country.code}`}`.
 *              Displays formatted population via `formatPopulation`.
 * @property {CountryData} country - The country data to display.
 *
 * @see {@link src/modules/utils} for `formatPopulation` utility.
 */

/**
 * @fileoverview Country detail page component.
 *
 * @file src/components/Details.tsx
 * @description Shows detailed information about a specific country including:
 *              - Flag image
 *              - Name, population, region, subregion, capital
 *              - Native name, top-level domain, currencies, languages
 *              - Border countries (rendered via `CountryStack`)
 *              - Back button for navigation
 *
 * **Loading State Handling:**
 * Shows a loading message while `initialLoading` is `true`.
 * Throws an error if the country is not found after loading completes.
 *
 * @property {string} countryCode - From `useParams`, used to look up the country.
 *
 * @example
 * // On reload of #/ESP:
 * // 1. initialLoading = true → shows "Loading..."
 * // 2. Cache from localStorage loads countryList
 * // 3. getCountryByCode('ESP') finds the country
 * // 4. Details render with full country information
 */

/**
 * @fileoverview Border countries stack component.
 *
 * @file src/components/CountryStack.tsx
 * @description Renders a row of clickable tags for border countries.
 *              Each tag is a `Link` to the border country's detail page.
 *              Uses a React fragment (`<>...</>`) so each `countryStack` element
 *              is a direct child of the grid container.
 * @property {CountryStackType} countrySet - Array of border country objects.
 *
 * @see {@link src/css/main.scss} for `.countryStack` styles.
 */

/**
 * @fileoverview Theme toggle button component.
 *
 * @file src/components/ThemeController.tsx
 * @description Renders a swap toggle switch for switching between light and dark modes.
 *              Uses `useThemeContext()` to access `theme` and `toggleTheme`.
 *              Displays the current theme label ("Light Mode" / "Dark Mode").
 */

/**
 * @fileoverview Navigation bar component.
 *
 * @file src/components/Top.tsx
 * @description Renders the top navigation bar with the app title and theme toggle.
 *              Uses `ThemeButton` for theme switching and `Link` for home navigation.
 * @property {string} title - The title text displayed in the navbar.
 */

/**
 * @fileoverview Region filter dropdown component.
 *
 * @file src/components/FilterRegion.tsx
 * @description Renders a DaisyUI dropdown for filtering countries by region.
 *              Uses `useDataContext()` to access `countryList` and `setFilteredCountries`.
 *              Supports filtering by "All" or specific regions (Africa, Americas, Asia, Europe, Oceania).
 */

// ============================================================================
// SECTION 9: UTILITY FUNCTIONS
// ============================================================================

/**
 * @fileoverview Utility functions.
 *
 * @file src/modules/utils.ts
 * @description Contains helper functions used across the application.
 *
 * @function capitalize
 * @description Capitalizes a given string by converting its first character to uppercase.
 * @param {string} text - The text to capitalize.
 * @returns {string} The capitalized text.
 *
 * @function compareStrings
 * @description Compares two strings in a case-insensitive manner.
 * @param {string} string1 - The first string to compare.
 * @param {string} string2 - The second string to compare.
 * @returns {boolean} True if both strings match (ignoring case), otherwise false.
 *
 * @function formatPopulation
 * @description Formats a population number using the German locale ("de-DE"),
 *              inserting dots as thousand separators.
 * @param {number} population - The numeric population value to format.
 * @returns {string} The formatted population string with thousand separators.
 */

/**
 * @fileoverview Error handling utilities.
 *
 * @file src/modules/errorHandler.ts
 * @description Contains custom error types and a centralized error handler.
 *
 * @class DataError
 * @description Custom error type for data-related failures.
 *              Extends the native `Error` class.
 *
 * @function errorHandler
 * @description Centralized error handler that processes both custom errors (`DataError`)
 *              and generic runtime errors.
 * @param {Error} error - The error instance to process.
 */

// ============================================================================
// SECTION 10: PROVIDER COMPOSITION
// ============================================================================

/**
 * @fileoverview Provider composition for the application.
 *
 * @file src/Providers/Providers.tsx
 * @description Wraps the application with both `ThemeProvider` and `DataProvider`.
 *              The nesting order is important: `ThemeProvider` wraps `DataProvider`
 *              so that theme context is available to all data consumers.
 *
 * @example
 * <ThemeProvider>
 *     <DataProvider>
 *         <App />
 *     </DataProvider>
 * </ThemeProvider>
 */

// ============================================================================
// SECTION 11: LOCALSTORAGE INTEGRATION SUMMARY
// ============================================================================

/**
 * @fileoverview Complete localStorage integration map.
 *
 * @description
 * Two keys are used in `localStorage`:
 *
 * | Key | Purpose | Set By | Read By |
 * |-----|---------|--------|---------|
 * | `'country-list'` | Cached default country data for instant route rendering | `DataProvider` after demo data loads | `DataProvider` on initialization |
 * | `'theme'` | Saved theme preference ('light' or 'dark') | `ThemeProvider` on every theme change | `ThemeProvider` on initialization |
 *
 * **Lifecycle of `country-list` key:**
 *
 * ```
 * App starts
 *   ├── localStorage.getItem('country-list')
 *   │   ├── Has cached data → setCountryList(parsed) → routes work instantly
 *   │   └── No cached data → state remains [] → show loading state
 *   ├── fetchAllCountries() → get data from demo JSON
 *   ├── localStorage.setItem('country-list', JSON.stringify(defaultFetchedCountries))
 *   ├── setCountryList(defaultHomeCountries) → state updated
 *   └── setInitialLoading(false) → UI ready
 * ```
 *
 * **Lifecycle of `theme` key:**
 *
 * ```
 * App starts
 *   ├── localStorage.getItem('theme')
 *   │   ├── Has saved theme → useState(theme) → initial theme restored
 *   │   └── No saved theme → useState('light') → default to light
 *   └── Theme changes → useEffect → localStorage.setItem('theme', newTheme)
 * ```
 *
 * **Why localStorage instead of sessionStorage:**
 * `localStorage` persists across browser sessions, so returning visitors
 * see their cached data and theme preference immediately without needing
 * to refetch from the demo data.
 */

// ============================================================================
// SECTION 12: BUILD CONFIGURATION
// ============================================================================

/**
 * @fileoverview Build and development configuration.
 *
 * @file vite.config.ts
 * @description Vite configuration with:
 * - `react()` - React plugin
 * - `@rolldown/plugin-babel` - Babel transpilation with React compiler preset
 * - `@tailwindcss/vite` - Tailwind CSS Vite plugin
 * - `base: './'` - Base path for asset URLs
 * - `build.outDir: './docs'` - Output directory for production builds
 *
 * @file package.json
 * @dependencies: tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, daisyui@^5.7.38, react@^19.2.8, react-router-dom@^7.18.3, sass@^1.104.1
 * @devDependencies: typescript@~6.0.2, vite@^8.2.2, @vitejs/plugin-react@^6.1.0
 */

/**
 * @file src/css/input.css
 * @description Contains the Tailwind CSS and DaisyUI plugin directives.
 *              This is the CSS entry point imported by `main.tsx`.
 */

/**
 * @file src/PREVmain.ts
 * @description Legacy vanilla JS implementation of the application.
 *              Excluded from TypeScript compilation via `tsconfig.app.json`.
 *              Retained for reference only.
 */
