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
 *              runtime using `sass-embedded`.
 *
 * @see {@link src/css/main.scss}
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
 * @fileoverview Custom hook for fetching country data from the RestCountries API.
 *
 * @file src/hooks/FetchData.tsx
 *
 * @description
 * The `useFetchData` hook encapsulates all API communication logic. It provides
 * two main functions: `fetchAllCountries` and `fetchByRegion`.
 *
 * **How it works:**
 * 1. Maintains internal state: `loading`, `error`, `countries`.
 * 2. `fetchAllCountries()` calls the private `fetchAll()` async function, which:
 *    - Constructs a URL using the API endpoint, CORS proxy, and auth token.
 *    - Sends a GET request with the `Authorization` header.
 *    - Parses the JSON response and maps each country object through
 *      `jsonNormalization()` to standardize the data format.
 *    - Returns a `Promise<CountryData[]>`.
 * 3. `fetchByRegion(region)` works similarly but filters by region.
 * 4. Both functions set `loading = true` before the request and `loading = false` after.
 *
 * **API Configuration:**
 * - `API_URL`: `https://api.restcountries.com/countries/v5`
 * - `CORS_PROXY`: `https://cors-anywhere.herokuapp.com/`
 * - `TOKEN`: `rc_live_31893b86ab1a4231be2c893453cbac9b`
 * - `DETAILS_PARAMS`: Specifies which fields to return from the API.
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
 * @description Makes the actual HTTP request to the RestCountries API.
 *              Uses `jsonNormalization()` to convert raw API data into
 *              standardized `CountryData` objects.
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
 * `jsonNormalization` converts raw API responses into the standardized
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
 * @description Normalizes raw API country data into `CountryData` format.
 * @param {any} raw - The raw country object from the API.
 * @returns {CountryData} A fully normalized country data object.
 *
 * Normalization includes:
 * - Extracting ISO alpha-3 codes (`codes.alpha_3`)
 * - Mapping official names (`names.official`)
 * - Mapping native names from nested objects
 * - Mapping languages and currencies
 * - Providing fallback values when API fields are unavailable
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
 * starts as an empty array `[]`. The async API fetch takes time to complete.
 * During this window, `getCountryByCode('ESP')` returns `undefined`, causing
 * `throw new Error('Country not found')`.
 *
 * **The Solution (localStorage Caching):**
 * 1. On initialization, `DataProvider` checks `localStorage` for a cached
 *    country list using the key `'country-list'`.
 * 2. If cached data exists and is valid JSON, it is loaded into state
 *    immediately. This means `getCountryByCode()` works right away.
 * 3. Simultaneously, `fetchAllCountries()` is called to get fresh data.
 * 4. When fresh data arrives, it is saved back to `localStorage` via
 *    `localStorage.setItem('country-list', JSON.stringify(data))`.
 * 5. State is updated with the fresh data, and `initialLoading` is set to `false`.
 *
 * **How localStorage Works with Page Changes:**
 *
 * | Event | localStorage Behavior |
 * |-------|----------------------|
 * | Initial load (first visit) | `localStorage` is empty → shows loading state → fetches from API → caches data |
 * | Initial load (returning visitor) | `localStorage` has cached data → state is populated immediately → routes work instantly → also fetches fresh data in background |
 * | Page reload on `#/country/ESP` | Cached data is loaded from `localStorage` → `getCountryByCode('ESP')` finds the country → `Details` renders correctly |
 * | Theme toggle (via ThemeContext) | `localStorage.setItem('theme', theme)` saves theme preference |
 * | Data updates (filter, etc.) | Only state changes; `localStorage` cache remains unchanged |
 *
 * **Key State Variables:**
 * - `countryList`: Full list of all countries (populated from cache or API)
 * - `filteredCountries`: Subset filtered by search (derived from `countryList`)
 * - `initialLoading`: `true` while checking cache + fetching; `false` when ready
 * - `loading`: `true` while API request is in progress (can be true even after initial load if user triggers a fetch)
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
 * @property {React.Dispatch<React.SetStateAction<CountryData[]>>} setCountryList - Setter for countryList.
 * @property {CountryData[]} filteredCountries - Filtered list based on search.
 * @property {(filter: string) => void} filterData - Filters countries by name.
 * @property {(code: string) => CountryData | undefined} getCountryByCode - Looks up a country by its ISO code.
 * @property {boolean} loading - Whether an API fetch is in progress.
 * @property {boolean} initialLoading - Whether the initial data load (cache + fetch) is complete.
 */

/**
 * @function filterData
 * @description Filters `countryList` by country name using case-insensitive matching.
 * @param {string} filter - Search string to match against country names.
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
 * **Color Variables (index.css values):**
 * - Light mode: `--bg: #fff`, `--text: #6b6375`, `--text-h: #08060d`
 * - Dark mode (system): `--bg: #16171d`, `--text: #9ca3af`, `--text-h: #f3f4f6`
 * - Dark mode (manual via `[data-theme]`): `--bg: hsl(207, 26%, 17%)`, `--text: hsl(0, 100%, 100%)`
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
// SECTION 7: CSS ARCHITECTURE — main.scss
// ============================================================================

/**
 * @fileoverview Main stylesheet containing all styles, CSS variables, and theme definitions.
 *
 * @file src/css/main.scss
 * @description This is the single entry point for all application styles. It contains:
 *
 * **1. Imports:**
 * - `@use 'fontNunito' as nunito` — SCSS module for Nunito Sans font variables
 * - `@import "tailwindcss"` — Tailwind CSS utility classes
 * - `@plugin "daisyui"` — DaisyUI component library
 *
 * **2. CSS Variables (`:root`):**
 * All theme colors are defined as CSS custom properties for both light and dark modes:
 * - `--text`, `--text-h`, `--bg`, `--border`, `--code-bg`, `--accent`, etc.
 * - `--input`, `--element` — used by components like `searchInput`, `card`, `countryStack`
 *
 * **3. Theme Definitions:**
 * - `@media (prefers-color-scheme: dark)` — Automatic dark mode based on system preference
 * - `[data-theme="dark"]` — Manual dark mode controlled by JS (DaisyUI + ThemeContext)
 *
 * **4. Base Styles:**
 * - `body`, `h1`, `h2`, `p` — Typography and reset styles
 * - `main`, `.background` — Layout background colors
 *
 * **5. Component Styles:**
 * - `.searchInput`, `.dropdownBtn`, `.dropdownItems`, `.card`, `.backBtn`
 * - `.countryStack` — Border country tags (uses `padding: 0.5rem 1rem`, no fixed height)
 * - `.countryTitle`, `.title`, `.cardTitle` — Typography classes
 * - `.cardTopLeft`, `.cardTopRight`, `.cardContent` — Card-specific styles
 *
 * **6. Responsive Design:**
 * - `@media (max-width: 550px)` — Adjusts font sizes and spacing for small screens
 * - `@media (max-width: 1024px)` — Adjusts root font size for tablets
 *
 * **Grid Layout for Country List (CountryList.tsx):**
 * ```css
 * .grid.md\:grid-cols-\[repeat\(auto-fit\,minmax\(20rem\,1fr\)\)\]
 * ```
 * - `md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]` uses CSS Grid's `auto-fit`
 * - As screen width decreases, columns automatically reduce and rows increase
 * - Each column has a minimum width of `20rem` and expands to fill available space
 * - No media queries needed — the grid is fully responsive
 *
 * @example
 * /* Country list grid behavior: *\/
 * /* Desktop (≥768px): 4 columns *\/
 * /* Tablet: 2 columns *\/
 * /* Mobile: 1 column *\/
 */

// ============================================================================
// SECTION 8: COMPONENT DOCUMENTATION
// ============================================================================

/**
 * @fileoverview Home page component.
 *
 * @file src/Pages/Home.tsx
 * @description Renders the search bar and country list. Uses `useDataContext()`
 *              to access `filteredCountries` and `countryList`. Shows filtered
 *              results if the search input has content, otherwise shows all countries.
 *
 * @example
 * <section className="container mx-auto mt-5 px-4 sm:px-0">
 *     <SearchBar searchMessage={"Search for a country..."} />
 *     <CountryList countries={countriesToShow} />
 * </section>
 */

/**
 * @fileoverview Search bar component.
 *
 * @file src/components/SearchBar.tsx
 * @description A styled search input wrapped in a DaisyUI label.
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
 *
 * **Loading State Handling:**
 * Shows a loading message while `initialLoading` is `true` (data being fetched
 * from cache/API). This prevents the `throw new Error('Country not found')`
 * that would occur on page reload before data is available.
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
 *
 * **Fix Applied:**
 * Previously used a `<div>` wrapper inside the grid, which caused all items
 * to be a single grid child. Changed to `<>...</>` fragment so each
 * `countryStack` element is a direct child of the grid container,
 * allowing `grid-cols-1 sm:grid-cols-2` to work correctly.
 *
 * @property {CountrySet[]} countrySet - Array of border country objects.
 *
 * @see {@link src/css/main.scss} for `.countryStack` styles.
 */

/**
 * @fileoverview Theme toggle button component.
 *
 * @file src/components/ThemeController.tsx
 * @description Renders a toggle switch for switching between light and dark modes.
 *              Uses `useThemeContext()` to access `theme` and `toggleTheme`.
 */

// ============================================================================
// SECTION 9: UTILITY FUNCTIONS
// ============================================================================

/**
 * @fileoverview Utility functions.
 *
 * @file src/modules/utils
 * @description Contains helper functions used across the application.
 *
 * @function formatPopulation
 * @description Formats a population number for display (e.g., adding commas).
 * @param {number} population - The raw population number.
 * @returns {string} Formatted population string.
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
 * | `'country-list'` | Cached country data for instant route rendering | `DataProvider` after API fetch | `DataProvider` on initialization |
 * | `'theme'` | Saved theme preference ('light' or 'dark') | `ThemeProvider` on every theme change | `ThemeProvider` on initialization |
 *
 * **Lifecycle of `country-list` key:**
 *
 * ```
 * App starts
 *   ├── localStorage.getItem('country-list')
 *   │   ├── Has cached data → setCountryList(parsed) → routes work instantly
 *   │   └── No cached data → state remains [] → show loading state
 *   ├── fetchAllCountries() → get data from API
 *   ├── localStorage.setItem('country-list', JSON.stringify(data))
 *   ├── setCountryList(data) → state updated
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
 * to refetch from the API.
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
 * - `@rolldown/plugin-babel` - Babel transpilation
 * - `@tailwindcss/vite` - Tailwind CSS Vite plugin
 * - `base: './'` - Base path for asset URLs
 * - `build.outDir: './docs'` - Output directory for production builds
 *
 * **SCSS Compilation:**
 * Vite handles `.scss` files using `sass-embedded`. When `main.tsx` imports
 * `./css/main.scss`, Vite compiles the SCSS including:
 * - `@use 'fontNunito'` - SCSS module resolution
 * - `@import "tailwindcss"` - Tailwind CSS import
 * - `@plugin "daisyui"` - DaisyUI plugin import
 * - All custom SCSS variables and mixins
 *
 * @file package.json
 * @dependencies: tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, daisyui@^5.7.22, sass-embedded@1.104.1
 */

/**
 * @file src/index.css
 * @description Currently empty. Previously contained Tailwind CSS imports and
 *              CSS variables. These have been migrated to `main.scss` which is
 *              now the single entry point for all styles. The `index.css` file
 *              can be removed or kept as a reference.
 */
