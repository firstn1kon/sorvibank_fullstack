import { useSearchParams } from 'react-router';
import { useGetUsers } from '../../../api/hooks/adminHooks/useGetUsers';
import User from './User';
import styles from './users.module.css';
import CheckBox from '../../ui/checkbox/Checkbox';
import { Check } from '../../ui/icons/Check';
import { UsersFilters } from '../../app/auth';
import { UsersSort } from '../../app/auth';

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
    </svg>
);

const Chevron = () => (
    <svg
        className={styles.chevron}
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const Users = () => {
    const [params, setParams] = useSearchParams();
    const filters: UsersFilters = {
        page: Number(params.get('page')) || 1,
        search: params.get('search') || undefined,
        role: (params.get('role') as UsersFilters['role']) || undefined,
        blocked: params.get('blocked') === 'true' || undefined,
        sort: (params.get('sort') as UsersSort) || 'createdAt_desc',
        limit: Number(params.get('limit')) || 20,
    };

    const { data: users } = useGetUsers(filters);

    console.log(users);
    return (
        <div>
            <div className={styles.card}>
                <div className={styles.head}>
                    <div className={styles.titleWrap}>
                        <h2 className={styles.title}>Пользователи</h2>
                        <span className={styles.count}>{users?.total}</span>
                    </div>
                    <label className={styles.search}>
                        <SearchIcon />
                        <input className={styles.searchInput} type="search" placeholder="Имя, email или телефон" />
                    </label>
                </div>

                <div className={styles.filters}>
                    <CheckBox
                        checked={params.get('blocked') === 'true'}
                        onCheckedChange={(value) =>
                            setParams(
                                (prev) => {
                                    if (value) prev.set('blocked', String(value));
                                    else prev.delete('blocked');
                                    prev.delete('page');
                                    return prev;
                                },
                                { replace: true },
                            )
                        }
                    >
                        Заблокированые
                    </CheckBox>

                    <div className={styles.dropdown}>
                        <button type="button" className={styles.chip}>
                            <span className={styles.chipLabel}>Роль:</span>
                            Все
                            <Chevron />
                        </button>
                        {/* меню роли — по образцу сортировки: Все / Админ / Игрок */}
                    </div>

                    <div className={styles.dropdown}>
                        <button type="button" className={`${styles.chip} ${styles.chipOpen}`}>
                            <span className={styles.chipLabel}>Сортировка:</span>
                            Сначала новые
                            <Chevron />
                        </button>
                        <div className={styles.menu}>
                            <span className={styles.menuGroup}>Дата создания</span>
                            <button type="button" className={`${styles.option} ${styles.optionActive}`}>
                                Сначала новые
                                <span className={styles.optionCheck}>
                                    <Check />
                                </span>
                            </button>
                            <button type="button" className={styles.option}>
                                Сначала старые
                            </button>
                            <div className={styles.menuDivider} />
                            <span className={styles.menuGroup}>Email</span>
                            <button type="button" className={styles.option}>
                                А → Я
                            </button>
                            <button type="button" className={styles.option}>
                                Я → А
                            </button>
                        </div>
                    </div>

                    <button type="button" className={styles.reset} onClick={() => setParams({})}>
                        Сбросить
                    </button>
                </div>

                <div className={styles.table}>
                    <div className={`${styles.row} ${styles.headRow}`}>
                        <span>Пользователь</span>
                        <span>Телефон</span>
                        <span>Роль</span>
                        <span>Статус</span>
                        <span>Регистрация</span>
                        <span />
                    </div>

                    <ul className={styles.container}>
                        {users?.items.map((user) => (
                            <li key={user.id}>
                                <User data={user} />
                            </li>
                        ))}
                    </ul>

                    <div className={styles.footer}>
                        <span>
                            1–{users?.total} из {users?.total}
                        </span>
                        <div className={styles.pages}>
                            <button type="button" className={`${styles.page} ${styles.pageActive}`}>
                                1
                            </button>
                            <button type="button" className={styles.page}>
                                2
                            </button>
                            <button type="button" className={styles.page}>
                                3
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
