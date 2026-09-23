import { NavLink } from 'react-router';
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import LogoutIcon from '../ui/icons/LogoutIcon';
import ProfileIcon from '../ui/icons/ProfileIcon';
import { useLogout } from '../../api/hooks/useLogout';
import { useFetchme } from '../../api/hooks/useFetchMe';
import DotLoader from '../ui/loaders/DotLoader';

const Header = () => {
    const { mutate: logout } = useLogout();

    const { data: user, isLoading } = useFetchme();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <NavLink to="/">
                        <img className={styles.logo} src={logo} alt="logo" />
                    </NavLink>
                    <div className={styles.account}>
                        <NavLink to="/account" className={styles.name}>
                            <div className={styles.profile}>
                                <div>
                                    <ProfileIcon fill="#FFd544" />
                                </div>
                                <div>{user?.name ?? (isLoading ? <DotLoader bg={'#fff'} /> : 'Личный кабинет')}</div>
                            </div>
                        </NavLink>
                        {user?.name ? (
                            <i className={styles.icon} onClick={handleLogout}>
                                <LogoutIcon fill="#cccccc" />
                            </i>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
