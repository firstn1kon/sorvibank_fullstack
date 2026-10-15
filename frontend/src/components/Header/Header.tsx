import { NavLink } from 'react-router';
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import LogoutIcon from '../ui/icons/LogoutIcon';
import ProfileIcon from '../ui/icons/ProfileIcon';
import { useLogout } from '../../api/hooks/useLogout';
import { useFetchme } from '../../api/hooks/useFetchMe';
import DotLoader from '../ui/loaders/DotLoader';
import MenuIcon from '../ui/icons/MenuIcon';

const Header = () => {
    const { mutate: logout } = useLogout();
    const { data: user, isLoading } = useFetchme();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.wrapper}`}>
                <NavLink to="/" className={styles.logoLink}>
                    <img className={styles.logo} src={logo} alt="Сорвибанк" />
                </NavLink>

                <div className={styles.account}>
                    <button type="button" className={`${styles.round} ${styles.menu}`} title="Меню" aria-label="Меню">
                        <MenuIcon />
                    </button>

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
