
# 🌍 Where in the World? — SPA Country Explorer

This project is part of the Per Scholas Software Engineering curriculum.

The goal was to build a country explorer using the RestCountries API, applying concepts such as DOM manipulation, API consumption, responsive design, and component-based architecture.

I decided to go beyond the basic requirements and build a **full Single Page Application (SPA)** without using any framework. Everything: navigation, rendering, state management, filtering, and theming is handled manually with vanilla TypeScript.

### Deploy

You can check the app [here.](https://chadgarc.github.io/rest-country-api/)

## 🚀 Features

### ✔ Single Page Application (SPA)
- No page reloads.
- Navigation between country list and country details handled entirely with JavaScript.
- Back button restores previous state without losing filters or search input.

### ✔ API Integration
- Data fetched from RestCountries API (v5).
- Pagination implemented manually (offset + limit).
- Custom normalization layer to convert raw API data into a clean `CountryData` model.

### ✔ Component-Based Architecture
Each UI element is built as a reusable component:
- Search bar
- Dropdown filter
- Country cards
- Country detail view
- Theme toggle
- Navigation bar

### ✔ Light/Dark Theme System
- Theme stored in `localStorage`.
- CSS variables (`--bg`, `--text`, `--element`) updated dynamically.
- DaisyUI swap animation integrated with custom theme logic.

### ✔ Search + Region Filtering
- Case-insensitive search.
- Region dropdown filter.
- Combined filtering (region + search).
- Default home countries shown when filters reset.

### ✔ Local Storage Caching
- Countries fetched once and stored locally.
- Faster reloads and reduced API calls.

---

## 🧠 What I Learned

### 🔹 Building a SPA without frameworks
I learned how much work frameworks normally do for us:
- State management
- Navigation
- Rendering
- Component lifecycle
- Re-rendering logic

Doing it manually helped me understand the **core mechanics** behind React, Vue, and Svelte.

### 🔹 API normalization
The RestCountries API returns deeply nested objects.  
I built a `jsonNormalization()` function to:
- Extract only the fields I need
- Flatten nested structures
- Provide fallback values
- Ensure consistent types

This made the rest of the app much easier to maintain.

### 🔹 Component architecture with vanilla JS
I practiced building UI components that:
- Return DOM elements
- Encapsulate their own structure
- Are reusable across the app

This is a great foundation for learning React.

### 🔹 Theme switching with CSS variables
I learned how to:
- Use `data-theme` attributes
- Bind JS logic to CSS variables
- Create dynamic themes without reloading the page

### 🔹 DOM event delegation
Instead of adding listeners to every card, I used:
```js
contentContainer.addEventListener('click', ...)
```

This is more efficient and scalable.

### 🔹 Managing state manually
I implemented:

- previousState for navigation
- defaultHomeCountries
- countries (full dataset)
- region + search filters

This taught me how frameworks handle state under the hood.

## 🏗 Technical Decisions
### ✔ Why a SPA?
I wanted:
- Faster navigation
- A more modern UX
- To challenge myself beyond the basic requirements

### ✔ Why normalize API data?
The API structure is inconsistent.
Normalization gives me:
- Clean, predictable objects
- Easier rendering
- Fewer null checks

### ✔ Why store countries in localStorage?
Avoid repeated API calls
- Improve performance
- Make the app usable offline after first load

### ✔ Why use CSS variables for theming?
They allow:
- Instant theme switching
- No re-rendering
- Clean separation between logic and styling

## 📌 Challenges I Faced

### 🔸 SPA navigation without frameworks

Handling:
- Back button
- State restoration
- Re-rendering was harder than expected.

### 🔸 API inconsistencies
Some countries have:
- No capital
- No borders
- Missing native names
- Missing languages
Normalization solved this.

### 🔸 Dropdown + search combined filtering
I had to carefully manage:
- Reset state
- Region selection
- Search input
- Default home countries

### 🔸 Theme persistence
Ensuring the theme loads before rendering the UI required careful ordering.

## 📝 Conclusion
This project helped me understand the fundamentals behind modern frontend frameworks.
Building a SPA manually gave me confidence in DOM manipulation, state management, API handling, and component architecture.

It also prepared me for the next steps in the curriculum, where I’ll apply these concepts using React.

## 🔧 Tech Stack
- TypeScript
- SCSS
- DaisyUI + Tailwind classes
- RestCountries API
- LocalStorage
- Vanilla DOM manipulation