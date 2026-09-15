import { HashRouter, Route, Routes } from 'react-router-dom';
import { useThemeContext } from "./Contexts/ThemeContext"
import { Home } from './Pages/Home';
import { Details } from './components/Details';
import Layout from './Pages/Layout';

function App() {
  const {theme} = useThemeContext();

  return (
    <div data-theme={theme}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/:country" element={<Details />} /> */}
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
