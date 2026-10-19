import { NavLink, useLocation } from 'react-router';
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import LogoutIcon from '../ui/icons/LogoutIcon';
import ProfileIcon from '../ui/icons/ProfileIcon';
import { useLogout } from '../../api/hooks/useLogout';
import { useFetchme } from '../../api/hooks/useFetchMe';
import DotLoader from '../ui/loaders/DotLoader';
import MenuIcon from '../ui/icons/MenuIcon';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import { useEffect, useRef, useState } from 'react';

type MenuState = 'closed' | 'open' | 'closing';

const Header = () => {
    const { mutate: logout } = useLogout();
    const { data: user, isLoading } = useFetchme();
    const { pathname } = useLocation();
    const [menu, setMenu] = useState<MenuState>('closed');
    const isOpenMenu = menu === 'open';
    const menuRef = useRef<HTMLDivElement>(null);
    const closeMenu = () => {
        setMenu((state) => (state === 'open' ? 'closing' : state));
    };
    const toggleMenu = () => {
        setMenu((state) => (state === 'open' ? 'closing' : 'open'));
    };

    useEffect(() => {
        if (!isOpenMenu) return;
        const handleMouseDown = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) closeMenu();
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleEsc);
        if (matchMedia('(max-width: 576px)').matches) document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpenMenu]);

    useEffect(() => {
        setMenu((state) => (state === 'open' ? 'closing' : state));
    }, [pathname]);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.wrapper}`}>
                <NavLink to="/" className={styles.logoLink}>
                    <img className={styles.logo} src={logo} alt="Сорвибанк" />
                </NavLink>

                <div className={styles.account}>
                    <div className={styles.menuWrap} ref={menuRef}>
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className={`${styles.round} ${styles.menu}`}
                            title={isOpenMenu ? 'Закрыть меню' : 'Меню'}
                            aria-label={isOpenMenu ? 'Закрыть меню' : 'Меню'}
                            aria-expanded={isOpenMenu}
                            aria-controls="header-menu"
                        >
                            <MenuIcon isOpen={isOpenMenu} />
                        </button>
                        {menu !== 'closed' && <HeaderMenu isClosing={menu === 'closing'} close={closeMenu} onClosed={() => setMenu('closed')} />}
                    </div>

                    {user?.name ? (
                        <>
                            <NavLink to="/me/main" className={styles.profile}>
                                <span className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</span>
                                <span className={styles.name}>{user.name}</span>
                            </NavLink>
                            <button type="button" className={styles.round} onClick={() => logout()} title="Выйти" aria-label="Выйти">
                                <LogoutIcon fill="#ffd544" />
                            </button>
                        </>
                    ) : isLoading ? (
                        <DotLoader bg="#fff" />
                    ) : (
                        <NavLink to="/login" className={styles.login}>
                            <ProfileIcon fill="#131313" />
                            <span className={styles.loginFull}>Личный кабинет</span>
                            <span className={styles.loginShort}>Войти</span>
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
