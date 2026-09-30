import styles from './profileLayout.module.css';
import HomeIcon from '../../ui/icons/HomeIcon';
import DevicesIcon from '../../ui/icons/DevicesIcon';
import LockIcon from '../../ui/icons/LockIcon';
import LogoutIcon from '../../ui/icons/LogoutIcon';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router';

const ProfileLayout = () => {
    return (
        <div className="container">
            <div className={styles.wrapper}>
                <div className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink
                                end
                                to="/me/main"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                                }
                            >
                                <div className={styles.navIcon}>
                                    <HomeIcon />
                                </div>
                                <div className={styles.navDesc}>Профиль</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                end
                                to="/me/sessions"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                                }
                            >
                                <div className={styles.navIcon}>
                                    <DevicesIcon />
                                </div>
                                <div className={styles.navDesc}>Устройства</div>
                            </NavLink>
                        </li>

                        <li className={styles.navItem}>
                            <div className={styles.navIcon}>
                                <LockIcon />
                            </div>
                            <div className={styles.navDesc}>Сменить пароль</div>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.navIcon}>
                                <LogoutIcon fill={'#000'} />
                            </div>
                            <div className={styles.navDesc}>Выход</div>
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
