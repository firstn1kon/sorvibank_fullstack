import styles from '../Steps/steps.module.css';
import Button from '../ui/button/Button';

import type { ReactNode } from 'react';

const Roads = ({ children }: { children?: ReactNode }) => (
    <svg className={styles.map} viewBox="0 0 142 276" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className={styles.roads} d="M-10 70H160M-10 170H160M44 -10V290M104 -10V290" />
        {children}
    </svg>
);

const Pin = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r={7} fill="#126df7" stroke="#fff" strokeWidth={3} />;

const CODE = '6529';

const STEPS: { text: string; bg?: string; screen: ReactNode }[] = [
    {
        text: 'Заходишь в игру',
        screen: (
            <>
                <Roads>
                    <rect x="56" y="82" width="36" height="76" rx="4" fill="#86a863" />
                </Roads>
                <div className={styles.card}>
                    <span className={styles.label}>Игра на сегодня</span>
                    <span className={styles.btn}>Играть</span>
                </div>
            </>
        ),
    },
    {
        text: 'Дожидаешься старта',
        screen: (
            <>
                <Roads>
                    <Pin x={44} y={170} />
                </Roads>
                <div className={styles.card}>
                    <span className={styles.label}>До старта</span>
                    <span className={styles.value}>00:05</span>
                </div>
            </>
        ),
    },
    {
        text: 'Приезжаешь в заданное место',
        screen: (
            <>
                <Roads>
                    <path className={styles.route} d="M44 190V70H104V50" />
                    <Pin x={44} y={190} />
                    <circle cx="104" cy="34" r="12" fill="#000" />
                    <path d="M95 41l9 13 9-13z" fill="#000" />
                    <circle cx="104" cy="34" r="4.5" fill="#ffd544" />
                </Roads>
                <div className={styles.card}>
                    <span className={styles.label}>Цель через</span>
                    <span className={`${styles.value} ${styles.value_s}`}>350 м</span>
                </div>
            </>
        ),
    },
    {
        text: 'Находишь код',
        bg: '#f7f3ee',
        screen: (
            <>
                <span className={styles.sign}>{CODE}</span>
                <div className={styles.card}>
                    <span className={styles.label}>Код найден</span>
                    <span className={`${styles.value} ${styles.value_xs}`}>{CODE}</span>
                </div>
            </>
        ),
    },
    {
        text: 'Вводишь его первым',
        bg: '#fff',
        screen: (
            <div className={`${styles.card} ${styles.card_flat}`}>
                <span className={styles.label}>Введи код</span>
                <span className={styles.code}>
                    {CODE.split('').map((c, i) => (
                        <span key={i}>{c}</span>
                    ))}
                </span>
                <span className={styles.btn}>Отправить</span>
            </div>
        ),
    },
    {
        text: 'Побеждаешь',
        bg: '#ffd544',
        screen: (
            <>
                <div className={styles.place}>
                    <b>1</b>
                    <span>место</span>
                </div>
                <div className={styles.card}>
                    <span className={styles.label}>Ты первый</span>
                    <span className={`${styles.value} ${styles.value_xs}`}>Победа!</span>
                </div>
            </>
        ),
    },
];

export const Steps = () => (
    <section className={styles.steps}>
        <div className="container">
            <div className={styles.title}>
                <h2>КАК</h2>
                <h3>принять участие</h3>
            </div>
            <ol className={styles.list}>
                {STEPS.map((s, i) => (
                    <li key={s.text} className={styles.step}>
                        <div className={styles.phone} aria-hidden="true">
                            <div className={styles.screen} style={s.bg ? { background: s.bg } : undefined}>
                                {s.screen}
                            </div>
                        </div>
                        <div className={styles.caption}>
                            <b className={styles.num}>{i + 1}</b>
                            <span className={styles.text_desc}>{s.text}</span>
                        </div>
                    </li>
                ))}
            </ol>
            <div className={styles.try}>
                <Button size="large">Играть</Button>
            </div>
        </div>
    </section>
);

export default Steps;
