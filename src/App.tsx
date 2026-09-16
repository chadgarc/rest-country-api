import { HashRouter, Route, Routes } from 'react-router-dom';
import { useThemeContext } from "./Contexts and Providers/ThemeContext"
import { Home } from './Pages/Home';
import { Details } from './components/DetailPage/Details';
import Layout from './Pages/Layout';

/**
 * Main application component.
 * Sets up hash-based routing with `HashRouter` from `react-router-dom`.
 * The `data-theme` attribute is set on the wrapper div based on
 * the current theme from `useThemeContext()`.
 *
 * Routes:
 * - `/` → `Layout` → `Home` (country search and listing)
 * - `/:countryCode` → `Layout` → `Details` (country detail page)
 *
 * @returns {JSX.Element} The application root element.
 */
function App() {
  const {theme} = useThemeContext();

  return (
    <div data-theme={theme} className='min-h-screen'>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:countryCode" element={<Details />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
