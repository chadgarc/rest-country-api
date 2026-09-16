import { Outlet } from 'react-router-dom';
import { Top } from '../components/Layout/Top';

/**
 * Layout wrapper component that provides a consistent structure
 * with a navigation bar (`Top`) and an `<Outlet>` for rendering child routes.
 *
 * @returns {JSX.Element} The layout element.
 */
const Layout = () => {
    return (
        <>
            <Top title="REST Countries of the World" />
            <Outlet />
        </>
    );
};

export default Layout;
