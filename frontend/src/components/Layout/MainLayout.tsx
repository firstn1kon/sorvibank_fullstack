import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router';

const MainLayout = () => {
    const { pathname } = useLocation();
    return (
        <div className="layout">
            {pathname !== '/' && <Header />}
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
