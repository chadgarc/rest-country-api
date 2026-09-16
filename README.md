# REST Countries API with Color Theme Switcher

Live site: [chadgarc.github.io/rest-country-api/#/](https://chadgarc.github.io/rest-country-api/#/)

## Overview

This is my second project for **Per Scholas**, a refactoring of my previous project into a full React + TypeScript + Vite stack. The project is based on the [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca) challenge from Frontend Mentor.

The original project was built using plain HTML, CSS, and TypeScript. For this iteration, I refactored the entire codebase to use React, adding modern patterns like custom hooks, React Context, and component-based architecture to better manage state and data across the application.

### The challenge

Users should be able to:

- See all featured countries from the data on the homepage
- Search for a country using an `input` field with debounced filtering
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to border countries on the detail page
- Navigate back to the previous page and preserve search/filter state
- Toggle the color scheme between light and dark mode with persistence

### Screenshot

![REST Countries App Preview](./frontend-files/preview.jpg)

## Built with

- **React 19** — JS library for building user interfaces
- **TypeScript** — Type-safe JavaScript
- **Vite** — Build tool with React plugin
- **Tailwind CSS v4** — Utility-first CSS framework
- **DaisyUI** — Plugin for Tailwind CSS components
- **SASS** — CSS preprocessor for custom styles and variables
- **React Router DOM v7** — Client-side routing with HashRouter
- **localStorage** — Persistent caching for country data and theme preference
- **React Compiler** — Build-time optimization via Babel preset

## Features

### Search with Debounce

The search bar implements a 300ms debounce so the filter function is not called on every keystroke. This keeps performance smooth even with the full dataset of 250+ countries.

### Composed Filtering

Search and region filters compose together through a derived filtering mechanism in `DataProvider`. Both filters write to separate state variables, and `filteredCountries` is computed as the intersection of both. Clearing one filter does not reset the other.

### Featured Countries on Initial Load

On first load, only 10 featured/default countries are displayed (DEU, USA, BRA, ISL, AFW, ALB, DZA, ECU, COL, and one more). The full country list is kept in context so that searches and region filters can search across all countries, but the default view is curated. When both filters are cleared, the app returns to showing only featured countries.

### Persistent Theme

The light/dark theme toggle uses a dedicated `ThemeContext` with `localStorage` persistence. The user's theme preference survives page reloads. The theme is applied via the `data-theme` attribute on the wrapper div, which DaisyUI reads to apply theme-specific CSS variables.

### Persistent Country Data with localStorage

`DataProvider` implements a two-phase loading strategy with `localStorage` caching. On initialization, it checks `localStorage` for cached country data so routes render instantly on page reload. Simultaneously, it fetches fresh data in the background. This prevents the "Country not found" error that would occur on deep route navigation before data is available.

### Navigation with React Router

Hash-based routing via `HashRouter` ensures routes persist on page reload without server-side configuration. The layout with header persists across all pages. Back navigation via `useNavigate(-1)` returns the user to the previous page with its filter/search state intact.

### Responsive Design

The country grid uses Tailwind's `md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]` for automatic responsive column adjustment. The layout adapts from desktop to mobile without media queries for the grid itself.

## Architecture

### File Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Top.tsx              # Navigation bar with title and theme toggle
│   │   └── ThemeController.tsx   # Light/dark mode swap toggle
│   ├── HomePage/
│   │   ├── Card.tsx             # Individual country card with flag and info
│   │   ├── CountryList.tsx      # Responsive grid of Country cards
│   │   ├── FilterRegion.tsx     # Region filter dropdown
│   │   └── SearchBar.tsx        # Debounced search input
│   └── DetailPage/
│       ├── CountryStack.tsx     # Border country tags
│       └── Details.tsx          # Full country detail view
├── Pages/
│   ├── HomePage.tsx             # Home page with search, filter, and list
│   ├── DetailsPage.tsx          # Country detail page route
│   └── Layout.tsx               # Layout wrapper with Outlet
├── ContextsAndProviders/
│   ├── CountryData.tsx          # DataProvider with localStorage caching
│   ├── ThemeContext.tsx         # ThemeProvider with localStorage persistence
│   └── Providers.tsx            # ThemeProvider wraps DataProvider
├── hooks/
│   └── FetchData.tsx            # Custom hook for data fetching
├── entities/
│   └── country.ts               # Country class and jsonNormalization
├── types/
│   └── index.ts                 # TypeScript interfaces and types
├── modules/
│   ├── utils.ts                 # capitalize, compareStrings, formatPopulation
│   └── errorHandler.ts          # DataError class and centralized errorHandler
├── css/
│   ├── input.css                # Tailwind CSS and DaisyUI directives
│   └── main.scss                # All custom styles, CSS variables, themes
├── App.tsx                      # Main app with HashRouter and routes
├── main.tsx                     # Application entry point
└── countryData/
    └── data.json                # Country data (250+ countries)
```

### Component Hierarchy

```
Providers (ThemeProvider > DataProvider)
├── App
│   └── HashRouter
│       └── Routes
│           ├── Layout (persistent header)
│           │   ├── Top (nav bar)
│           │   │   ├── Link (title)
│           │   │   └── ThemeController
│           │   └── Outlet
│           │       ├── HomePage
│           │       │   ├── SearchBar
│           │       │   ├── FilterRegion
│           │       │   └── CountryList
│           │       │       └── Card[]
│           │       └── DetailsPage
│           │           └── Details
│           │               └── CountryStack[]
```

### State Management

- **`DataProvider`** — Manages all country data via React Context with localStorage caching. Exposes `countryList`, `filteredCountries`, `defaultHomeCountries`, `searchTerm`, `selectedRegion`, `filterData()`, `filterByRegion()`, `getCountryByCode()`.
- **`ThemeContext`** — Manages light/dark theme via React Context with localStorage persistence. Exposes `theme`, `toggleTheme`.
- **`useFetchData`** — Custom hook that fetches country data from the demo JSON file. Manages `loading`, `error`, and `countries` state internally.

### Data Flow

```
countryData/data.json
  → FetchData.tsx (jsonNormalization)
    → DataProvider (context + localStorage)
      → Components (filteredCountries derived)
```

## What I learned

- **React Context patterns** — How to manage global state with Context providers, the importance of provider nesting order (ThemeProvider wraps DataProvider), and how to derive state from multiple context values.
- **localStorage caching strategy** — The two-phase loading approach (check cache → show instantly → fetch fresh) prevents route bugs on page reload and provides instant navigation for returning visitors.
- **Composed filtering architecture** — Separating filter state into independent variables (`searchTerm`, `selectedRegion`) and deriving the output as an intersection ensures filters compose correctly without overwriting each other.
- **Debounce implementation** — Using `useRef` and `useEffect` to debounce the search input prevents excessive filter calls on every keystroke, keeping the UI responsive.
- **SASS with Tailwind and DaisyUI** — Integrating SASS custom styles alongside Tailwind utility classes and DaisyUI component styles, using CSS custom properties for theming.
- **HashRouter routing** — Using `HashRouter` instead of `BrowserRouter` for static hosting compatibility, with `useNavigate(-1)` for back navigation that preserves state.
- **Component refactoring** — Translating vanilla JS code into React components, learning how to decompose a monolithic script into reusable, composable components with clear interfaces.

## AI Collaboration

This project leverages AI tools to enhance the learning workflow, not replace it.

- **What tools were used:** Antigravity, OpenCode
- **How they were used:**
  - **Autocompletion** — Accelerating development by suggesting code completions for React patterns, TypeScript types, and Tailwind classes
  - **Code explanations** — Getting clarifications on concepts still being learned, such as React hooks rules, Context API patterns, and TypeScript generics
  - **Concept breakdowns** — Asking for explanations of architectural decisions like why `useCallback` with empty dependencies creates stable references, or how `useEffect` dependencies affect re-renders
  - **Debugging** — Identifying issues like duplicated JSX from failed edits, unused state variables, and lint conflicts
  - **Documentation** — Generating JSDoc comments for all components, hooks, and functions to improve code readability and future comprehension
- **What worked well:** Using AI as a peer to discuss architectural trade-offs, explore edge cases, and challenge assumptions about React patterns
- **Integration improvement:** Treating AI as a senior colleague who can explain _why_ something works, not just _how_ to write it, which leads to deeper understanding and better retention

## Resources

- [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca) — The original challenge design and requirements
- [REST Countries API](https://restcountries.com) — The API that inspired this project (data is served locally via `data.json`)
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first CSS framework
- [DaisyUI](https://daisyui.com) — Tailwind CSS component plugin
- [Vite](https://vite.dev) — Build tool and development server
- [React Router DOM v7](https://reactrouter.com) — Client-side routing
- [SASS](https://sass-lang.com) — CSS preprocessor for custom styles

## Development

### Prerequisites

- Node.js (with pnpm or npm)
- TypeScript

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production (output: ./docs)
pnpm preview    # Preview the production build
pnpm lint       # Run ESLint
```

### Environment Variables

The project uses a `.env` file for configuration. The API credentials are provided by Frontend Mentors to avoid exposing sensitive tokens in the source code.

```env
VITE_API_URL="https://api.restcountries.com/countries/v5"
VITE_CORS_PROXY="https://cors-anywhere.herokuapp.com/"
VITE_TOKEN=TOKEN
VITE_DETAILS_PARAMS="response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png"
```

### Build Output

The production build outputs to `./docs` directory, making it ready for deployment on GitHub Pages or similar static hosting platforms.

```bash
pnpm build    # Output: ./docs
```

The `base: './'` configuration in `vite.config.ts` ensures all asset URLs are relative, which is required for GitHub Pages deployment.
