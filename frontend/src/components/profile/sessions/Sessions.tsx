import styles from '../profileMain.module.css';
import DevicesIcon from '../../ui/icons/DevicesIcon';
import WindowsIcon from '../../ui/icons/WindowsIcon';
import AppleIcon from '../../ui/icons/AppleIcon';
import AndroidIcon from '../../ui/icons/AndroidIcon';
import { useSseions } from '../../../api/hooks/useSessions';
import LogoutIcon from '../../ui/icons/LogoutIcon';
import { useDeleteSession } from '../../../api/hooks/useDeleteSession';
import { useLogoutAll } from '../../../api/hooks/useLogoutAll';
import { useLogout } from '../../../api/hooks/useLogout';

export const getDeviceIcon = (os: string | null | undefined) => {
    if (!os) return DevicesIcon;
    if (os.includes('windows')) return WindowsIcon;
    if (os.includes('mac') || os.includes('ios')) return AppleIcon;
    if (os.includes('android')) return AndroidIcon;
    return DevicesIcon;
};

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso));

const Sessions = () => {
    const { data: sessions } = useSseions();
    const { mutate: doLogoutSession } = useDeleteSession();
    const { mutate: doLogoutAll } = useLogoutAll();
    const { mutate: doLogout } = useLogout();

    return (
        <>
            <div className={styles.summary}>
                <span className={styles.name}>Устройства</span>
                <span className={styles.hint}>Где выполнен вход в аккаунт</span>
            </div>
            <ul className={styles.profile}>
                {sessions &&
                    sessions.map((session) => {
                        const IconDevice = getDeviceIcon(session.os);
                        return (
                            <li key={session.id} className={`${styles.profileItem} ${session.current ? styles.active : ''}`}>
                                <div className={styles.icon}>
                                    <IconDevice fill="#131313" />
                                </div>
                                <div className={styles.desc}>
                                    <div className={styles.title}>
                                        {session?.deviceInfo}
                                        {session.current && <span className={styles.current}>Это устройство</span>}
                                    </div>
                                    <span className={styles.meta}>
                                        IP {session?.ipAddress} · вход {formatDate(session.createdAt)}
                                    </span>
                                </div>
                                <div
                                    className={styles.edit}
                                    role="button"
                                    aria-label="Выйти"
                                    title="Выйти"
                                    onClick={() => (session.current ? doLogout() : doLogoutSession(session.id))}
                                >
                                    <LogoutIcon fill="#131313" />
                                </div>
                            </li>
                        );
                    })}
                <li className={`${styles.profileItem} ${styles.danger}`} role="button" onClick={() => doLogoutAll()}>
                    <LogoutIcon fill="#e22121" />
                    Выйти со всех устройств
                </li>
            </ul>
        </>
    );
};

export default Sessions;
