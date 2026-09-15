import { Outlet } from 'react-router-dom';
import { Top } from '../components/Top';

const Layout = () => {
    return (
        <>
            <Top title="REST Countries of the World" />
            <Outlet />
        </>
    );
};

export default Layout;
