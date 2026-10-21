import { useFetchme } from '../../api/hooks/useFetchMe';
import styles from './profileMain.module.css';
import CalendarIcon from '../ui/icons/CalendarIcon';
import PencilIcon from '../ui/icons/PencilIcon';
import CardIcon from '../ui/icons/CardIcon';
import EmailIcon from '../ui/icons/EmailIcon';
import PhoneIcon from '../ui/icons/PhoneIcon';
import LockIcon from '../ui/icons/LockIcon';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { Link } from 'react-router';
import { useState } from 'react';
import AcceptIcon from '../ui/icons/AcceptIcon';
import { useUpdateMe } from '../../api/hooks/useUpdateMe';
import { toast } from 'sonner';
import clsx from 'clsx';
import CancelIcon from '../ui/icons/CancelIcon';

const ProfileMain = () => {
    const { data: user } = useFetchme();
    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState('');

    const { mutate: doChangeName } = useUpdateMe({
        onSuccess: () => setEdit(false),
    });

    if (!user) return null;

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target?.value);
    };

    const handleEdit = () => {
        setName(user.name ?? '');
        setEdit((prev) => !prev);
    };

    const patchUserName = () => {
        if (name === user.name) {
            toast.warning('Имя совпадает с предыдущим');
            return;
        }
        doChangeName({ name });
    };

    return (
        <>
            <div className={styles.summary}>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.hint}>Данные вашего профиля</span>
            </div>
            <ul className={styles.profile}>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <CalendarIcon />
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.meta}>Создан</span>
                        <div className={styles.title}>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</div>
                    </div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <CardIcon />
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.meta}>Имя</span>
                        {isEdit ? (
                            <div className={`${styles.title} ${styles.editItem}`}>
                                <input autoFocus className={styles.inputName} onChange={handleChangeName} value={name} />
                                <span className={styles.accept} onClick={patchUserName}>
                                    <AcceptIcon fill={'#54a96e'} width="20px" height="20px" />
                                </span>
                            </div>
                        ) : (
                            <div className={styles.title}>{user.name}</div>
                        )}
                    </div>
                    <div className={clsx(styles.edit, { [styles.active_edit]: isEdit })} onClick={handleEdit}>
                        {isEdit ? <CancelIcon /> : <PencilIcon />}
                    </div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <EmailIcon />
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.meta}>Email</span>
                        <div className={styles.title}>{user.email}</div>
                    </div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <PhoneIcon />
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.meta}>Телефон</span>
                        <div className={styles.title}>{formatPhoneNumber(user.phone)}</div>
                    </div>
                </li>
                <li className={styles.profileItem}>
                    <div className={styles.icon}>
                        <LockIcon />
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.meta}>Пароль</span>
                        <div className={styles.title}>*********</div>
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
