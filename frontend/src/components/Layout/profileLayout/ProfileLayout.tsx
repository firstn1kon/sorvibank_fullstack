import styles from './profileLayout.module.css';
import HomeIcon from '../../ui/icons/HomeIcon';
import DevicesIcon from '../../ui/icons/DevicesIcon';
import LockIcon from '../../ui/icons/LockIcon';
import LogoutIcon from '../../ui/icons/LogoutIcon';
import { Outlet, useLocation } from 'react-router';
import { NavLink } from 'react-router';
import { useEffect, useRef } from 'react';

const ProfileLayout = () => {
    const { pathname } = useLocation();
    const navListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const list = navListRef.current;
        const activeItem = list?.querySelector<HTMLElement>(`.${styles.active}`);
        if (!list || !activeItem || list.scrollWidth <= list.clientWidth) return;

        list.scrollTo({ left: activeItem.offsetLeft - list.offsetLeft - 12, behavior: 'smooth' });
    }, [pathname]);

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <div className={styles.nav}>
                    <ul ref={navListRef}>
                        <li>
                            <NavLink end to="/me/main" className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}>
                                <div className={styles.navIcon}>
                                    <HomeIcon />
                                </div>
                                <div className={styles.navDesc}>Профиль</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/me/sessions" className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}>
                                <div className={styles.navIcon}>
                                    <DevicesIcon />
                                </div>
                                <div className={styles.navDesc}>Устройства</div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                end
                                to="/me/change-password"
                                className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}
                            >
                                <div className={styles.navIcon}>
                                    <LockIcon />
                                </div>
                                <div className={styles.navDesc}>Cменить пароль</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/me/logout" className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}>
                                <div className={styles.navIcon}>
                                    <LogoutIcon fill={'#000'} />
                                </div>
                                <div className={styles.navDesc}>Выход</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
