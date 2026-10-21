import { UserForAadmin } from '../../app/auth';
import styles from './users.module.css';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

const Check = ({ size = 16, width = 2.6 }: { size?: number; width?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
);

const DotsIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <circle cx="12" cy="5" r="1.8" />
        <circle cx="12" cy="12" r="1.8" />
        <circle cx="12" cy="19" r="1.8" />
    </svg>
);

const User = ({ data: u }: { data: UserForAadmin }) => {
    return (
        <div key={u.id} className={styles.row}>
            <div className={styles.user}>
                <span className={styles.avatar}>{u.name?.charAt(0).toUpperCase()}</span>
                <div className={styles.userText}>
                    <span className={styles.name}>{u?.name}</span>
                    <span className={styles.emailLine}>
                        <span className={styles.email}>{u.email}</span>
                        {u.emailVerified && (
                            <span className={styles.verified} title="Email подтверждён">
                                <Check size={14} />
                            </span>
                        )}
                    </span>
                </div>
            </div>

            <span className={styles.cell}>{formatPhoneNumber(u.phone)}</span>

            <div>
                <span className={`${styles.badge} ${u.role === 'ADMIN' ? styles.roleAdmin : styles.roleUser}`}>{u.role === 'ADMIN' ? 'Админ' : 'Игрок'}</span>
            </div>

            <div>
                {u.blockedAt ? (
                    <span className={`${styles.badge} ${styles.statusBlocked}`} title={u.blockedReason ?? undefined}>
                        <span className={styles.dot} />
                        Заблокирован
                    </span>
                ) : (
                    <span className={`${styles.badge} ${styles.statusActive}`}>
                        <span className={styles.dot} />
                        Активен
                    </span>
                )}
            </div>

            <div className={styles.dates}>
                <span className={styles.cell}>{new Date(u.createdAt).toLocaleDateString('ru-RU')}</span>
                <span className={styles.updated}>изм. {new Date(u.updatedAt).toLocaleDateString('ru-RU')}</span>
            </div>

            <button type="button" className={styles.actions} aria-label="Действия">
                <DotsIcon />
            </button>
        </div>
    );
};

export default User;
