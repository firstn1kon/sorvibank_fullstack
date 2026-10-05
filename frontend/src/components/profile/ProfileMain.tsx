import { useFetchme } from '../../api/hooks/useFetchMe';
import styles from './profileMain.module.css';
import CalendarIcon from '../ui/icons/CalendarIcon';
import PencilIcon from '../ui/icons/PencilIcon';
import CardIcon from '../ui/icons/CardIcon';
import EmailIcon from '../ui/icons/EmailIcon';
import PhoneIcon from '../ui/icons/PhoneIcon';
import LockIcon from '../ui/icons/LockIcon';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import AccountIcon from '../ui/icons/AccountIcon';
import { Link } from 'react-router';

const ProfileMain = () => {
    const { data: user } = useFetchme();
    return (
        <>
            <div className={styles.summary}>
                <AccountIcon width="100px" height="100px" />
                <span className={styles.name}>{user?.name}</span>
            </div>
            <ul className={styles.profile}>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <CalendarIcon />
                    </div>
                    <div className={styles.desc}>
                        Создан: <span>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className={styles.edit}></div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <CardIcon />
                    </div>
                    <div className={styles.desc}>
                        Имя: <span>{user.name}</span>
                    </div>
                    <div className={styles.edit}>
                        <PencilIcon />
                    </div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <EmailIcon />
                    </div>
                    <div className={styles.desc}>
                        Email: <span>{user.email}</span>
                    </div>
                    <div className={styles.edit}></div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <PhoneIcon />
                    </div>
                    <div className={styles.desc}>
                        Телефон: <span>{formatPhoneNumber(user.phone)}</span>
                    </div>
                    <div className={styles.edit}></div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <LockIcon />
                    </div>
                    <div className={styles.desc}>
                        Пароль: <span>*********</span>
                    </div>
                    <div className={styles.edit}>
                        <Link to="/me/change-password">
                            <PencilIcon />
                        </Link>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default ProfileMain;
