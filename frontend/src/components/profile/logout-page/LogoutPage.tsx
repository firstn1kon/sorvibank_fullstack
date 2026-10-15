import styles from '../profileMain.module.css';
import { useSseions } from '../../../api/hooks/useSessions';
import { getDeviceIcon } from '../sessions/Sessions';
import { useLogout } from '../../../api/hooks/useLogout';
import LogoutIcon from '../../ui/icons/LogoutIcon';

const LogoutPage = () => {
    const { data: sessions } = useSseions();
    const { mutate: doLogout } = useLogout();

    const currentSession = sessions?.find((session) => session.current) || null;
    const IconDevice = getDeviceIcon(currentSession?.os);
    return (
        <>
            <div className={styles.summary}>
                <span className={styles.name}>Выход</span>
                <span className={styles.hint}>Будет завершен текущий сеанс на устройстве:</span>
            </div>

            <ul className={styles.profile}>
                {currentSession && (
                    <li key={currentSession.id} className={`${styles.profileItem}`}>
                        <div className={styles.icon}>
                            <IconDevice fill="#131313" />
                        </div>
                        <div className={styles.desc}>
                            <div className={styles.title}>{currentSession?.deviceInfo}</div>
                            <span className={styles.meta}>IP {currentSession?.ipAddress}</span>
                        </div>
                    </li>
                )}
                <li className={`${styles.profileItem} ${styles.danger}`} role="button" onClick={() => doLogout()}>
                    <LogoutIcon fill="#e22121" />
                    Выйти
                </li>
            </ul>
        </>
    );
};

export default LogoutPage;
