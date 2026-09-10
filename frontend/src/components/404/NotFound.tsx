import styles from './notfound.module.css';
import logo from '../../assets/logoinvert.svg';
import { NavLink } from 'react-router';

const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <img className={styles.logo} src={logo} alt="SORVIBANK" />
            <span className={`mt-8 ${styles.header}`}>404 - Такой сраницы нет</span>
            <span className={styles.desc}>Но есть много чего интересного</span>
            <span className={styles.header}>
                Начни свой путь с <NavLink to="/">ГЛАВНОЙ СТРАНИЦЫ</NavLink>
            </span>
        </div>
    );
};

export default NotFound;
