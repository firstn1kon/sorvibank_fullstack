import styles from './mapSection.module.css';
import Button from '../ui/button/Button';
import phone from '../../assets/phone.svg';

const CARDS = [
    { key: 'Монета', text: 'Где-то на территории Москвы спрятана монета с кодом' },
    { key: '20 минут', text: 'Каждые 20 минут открывается новый кусок карты' },
    { key: '5 метров', text: 'В конечной точке мы оставили метку. В радиусе 5 метров от нее спрятана монета с кодом' },
    { key: 'Код', text: 'Найди монету, введи код, сорви банк' },
];

export const MapSection = () => (
    <section className={styles.section}>
        <div className="container">
            <div className={styles.title}>
                <h2>ТО</h2>
                <h3>попробуй SORVIBANK! Так что же это такое?</h3>
            </div>

            <div className={styles.body}>
                <div className={styles.phone}>
                    <img src={phone} alt="Карта Москвы, поделенная на квадраты, с меткой SB" width={280} height={560} />
                    <div className={styles.coin} aria-hidden="true">
                        <span>SB</span>
                    </div>
                </div>

                <div className={styles.text}>
                    <p className={styles.lead}>У тебя есть карта поделенная на квадраты</p>
                    <ol className={styles.cards}>
                        {CARDS.map((c, i) => (
                            <li key={c.key} className={styles.card}>
                                <span className={styles.key}>
                                    <i>{i + 1}</i>
                                    {c.key}
                                </span>
                                <span className={styles.card_text}>{c.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className={styles.plaque}>
                <span className={styles.final}>Будь быстрее, хитрее, умнее остальных и найди монету с кодом первым!</span>
                <Button size="large" extraClass={styles.button_dark}>
                    Найти
                </Button>
            </div>
        </div>
    </section>
);

export default MapSection;
