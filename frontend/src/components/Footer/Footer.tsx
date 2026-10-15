import styles from './footer.module.css';
import logo from '../../assets/logoinvert.svg';
import youtube from '../../assets/icon-yt.svg';
import telegram from '../../assets/icon-telegram.svg';

const year = new Date().getFullYear();

const NETWORKS = [
    { name: 'YouTube', href: '#', icon: youtube },
    { name: 'Telegram', href: '#', icon: telegram },
];

const Footer = () => (
    <div>
        <footer className={styles.footer}>
            <div className={`container ${styles.wrapper}`}>
                <img className={styles.logo} src={logo} alt="Сорвибанк" />
                <div className={styles.copyright}>Сорвибанк 2024 - {year}</div>
                <div className={styles.social}>
                    {NETWORKS.map((n) => (
                        <a key={n.name} href={n.href} className={styles.network} target="_blank" rel="noreferrer">
                            <img src={n.icon} alt="" aria-hidden="true" />
                            <span>{n.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    </div>
);

export default Footer;
