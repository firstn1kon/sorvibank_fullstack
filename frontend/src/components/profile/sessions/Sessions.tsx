import styles from '../profileMain.module.css';
import DevicesIcon from '../../ui/icons/DevicesIcon';
import WindowsIcon from '../../ui/icons/WindowsIcon';
import AppleIcon from '../../ui/icons/AppleIcon';
import AndroidIcon from '../../ui/icons/AndroidIcon';
import { useSseions } from '../../../api/hooks/useSessions';
import LogoutIcon from '../../ui/icons/LogoutIcon';
import SessionsIcon from '../../ui/icons/SessionsIcon';
import AcceptIcon from '../../ui/icons/AcceptIcon';
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

const Sessions = () => {
    const { data: sessions } = useSseions();
    const { mutate: doLogoutSession } = useDeleteSession();
    const { mutate: doLogoutAll } = useLogoutAll();
    const { mutate: doLogout } = useLogout();

    return (
        <>
            <div className={styles.summary}>
                <SessionsIcon width="100px" height="100px" />
                <span className={styles.name}>Устройства</span>
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', color: ' #9b9a9a' }}>
                Ваши устройства, на которых вы вошли в аккаунт
            </span>
            <ul className={styles.profile}>
                {sessions &&
                    sessions.map((session) => {
                        const IconDevice = getDeviceIcon(session.os);
                        return (
                            <li className={styles.profileItem} key={session.id}>
                                <div className={styles.icon}>
                                    <IconDevice />
                                </div>
                                <div className={styles.desc}>
                                    {session?.deviceInfo} <br></br>IP: {session?.ipAddress}
                                    {session.current && (
                                        <span style={{ fontWeight: '400', display: 'flex' }}>
                                            <AcceptIcon fill={'#1380c5'} width="18px" /> Текущий сеанс
                                        </span>
                                    )}
                                </div>

                                <div className={styles.edit} onClick={() => (session.current ? doLogout() : doLogoutSession(session.id))}>
                                    <LogoutIcon fill={'#000'} />
                                </div>
                            </li>
                        );
                    })}
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <DevicesIcon fill={'#e22121'} />
                    </div>
                    <div className={styles.desc}>
                        <span style={{ color: '#e22121', fontWeight: '500' }}>Выйти со всех устройств</span>
                    </div>

                    <div className={styles.edit} onClick={() => doLogoutAll()}>
                        <LogoutIcon fill={'#e22121'} />
                    </div>
                </li>
            </ul>
        </>
    );
};

export default Sessions;
