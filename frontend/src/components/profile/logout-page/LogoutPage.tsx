import LogoutPageIcon from '../../ui/icons/LogoutPageIcon';
import styles from '../profileMain.module.css';
import { useSseions } from '../../../api/hooks/useSessions';
import { getDeviceIcon } from '../sessions/Sessions';
import AcceptIcon from '../../ui/icons/AcceptIcon';
import WarningIcon from '../../ui/icons/WarningIcon';
import Button from '../../ui/button/Button';
import { useLogout } from '../../../api/hooks/useLogout';
import DotLoader from '../../ui/loaders/DotLoader';

const LogoutPage = () => {
    const { data: sessions } = useSseions();
    const { mutate: doLogout, isPending } = useLogout();

    const currentSession = sessions?.find((session) => session.current) || null;
    const IconDevice = getDeviceIcon(currentSession?.os);
    return (
        <>
            <div className={styles.summary}>
                <LogoutPageIcon width="100px" height="100px" />
                <span className={styles.name}>Выйти</span>
            </div>
            {currentSession && (
                <ul className={styles.profile}>
                    <li className={styles.profileItem}>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '4px',
                                color: ' #9b9a9a',
                                textAlign: 'center',
                            }}
                        >
                            <div className={styles.icon}>
                                <WarningIcon fill="#F59E0B" />
                            </div>
                            <span>Будет завершен текущий сеанс на устройстве</span>
                        </div>
                    </li>
                    <li className={styles.profileItem}>
                        <div className={styles.icon}>
                            <IconDevice />
                        </div>
                        <div className={styles.desc}>
                            {currentSession?.deviceInfo} - IP: {currentSession?.ipAddress}
                        </div>

                        <div style={{ flexShrink: '0' }}>
                            <AcceptIcon fill={'#1380c5'} width="18px" />
                        </div>
                    </li>
                </ul>
            )}
            <div className={`mt-4 ${styles.profile}`}>
                <Button onClick={doLogout}>{isPending ? <DotLoader /> : 'ВЫЙТИ'}</Button>
            </div>
        </>
    );
};

export default LogoutPage;
