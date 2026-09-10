import { NavLink } from 'react-router';
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import LogoutIcon from '../ui/icons/LogoutIcon';
import ProfileIcon from '../ui/icons/ProfileIcon';

const Header = () => {
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
                                <div>Личный кабинет</div>
                            </div>
                        </NavLink>
                        <i className={styles.icon}>
                            <LogoutIcon fill="#cccccc" />
                        </i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
