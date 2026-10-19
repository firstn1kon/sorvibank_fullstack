import clsx from 'clsx';
import styles from './headerMenu.module.css';
import { NavLink } from 'react-router';
import CloseIcon from '../ui/icons/CloseIcon';

interface HeaderMenuProps {
    isClosing: boolean;
    close: () => void;
    onClosed: () => void;
}

const itemClass = ({ isActive }: { isActive: boolean }) => clsx(styles.item, isActive && styles.active);

const HeaderMenu = ({ isClosing, close, onClosed }: HeaderMenuProps) => {
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
        if (isClosing && e.target === e.currentTarget) onClosed();
    };

    return (
        <div className={clsx(styles.root, isClosing && styles.closing)}>
            <div className={styles.overlay} onClick={close}></div>
            <nav id="header-menu" className={styles.menu} aria-label="Меню" onAnimationEnd={handleAnimationEnd}>
                <div className={styles.handle}></div>
                <div className={styles.head}>
                    <p className={styles.title}>Меню</p>
                    <button className={styles.close} type="button" aria-label="Закрыть" onClick={close}>
                        <CloseIcon />
                    </button>
                </div>

                <ul className={styles.list}>
                    <li>
                        <a className={styles.item} href="/games">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                    <circle cx="12" cy="12" r="7" />
                                    <circle cx="12" cy="12" r="2.6" fill="currentColor" />
                                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                                </svg>
                            </span>
                            Игры
                        </a>
                    </li>
                    <li>
                        <a className={styles.item} href="/my-games">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <g transform="translate(-1.5 -1.5) scale(.86)">
                                        <circle cx="12" cy="12" r="7" />
                                        <circle cx="12" cy="12" r="2.6" fill="currentColor" />
                                        <path d="M12 2v3M2 12h3" />
                                    </g>
                                    <circle className={styles.plateFill} cx="16" cy="16" r="8.4" stroke="none" />
                                    <circle cx="16" cy="13.6" r="2.6" strokeWidth="1.7" />
                                    <path d="M11.4 21.6c.8-2.4 2.5-3.6 4.6-3.6s3.8 1.2 4.6 3.6" strokeWidth="1.7" />
                                </svg>
                            </span>
                            Мои игры
                        </a>
                    </li>
                    <li>
                        <a className={styles.item} href="/how-to-play">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M10 8.5l5 3.5-5 3.5z" />
                                </svg>
                            </span>
                            Как играть
                        </a>
                    </li>
                    <li>
                        <NavLink className={itemClass} end to="/me/sessions">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                                    <path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
                                    <path d="M9 9h5M9 13h5" />
                                </svg>
                            </span>
                            Правила
                        </NavLink>
                    </li>
                    <li className={styles.divider} role="separator"></li>
                    <li>
                        <NavLink className={itemClass} end to="/me/main">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
                                </svg>
                            </span>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <a className={styles.item} href="/support">
                            <span className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                                    <path d="M4 5h16v11H9l-5 4z" />
                                </svg>
                            </span>
                            Поддержка
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HeaderMenu;
