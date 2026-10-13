import styles from './tiles.module.css';
import plot1 from '../../assets/tiles/plot-1.svg';
import plot2 from '../../assets/tiles/plot-2.svg';
import plot3 from '../../assets/tiles/plot-3.svg';
import plot4 from '../../assets/tiles/plot-4.svg';
import plot5 from '../../assets/tiles/plot-5.svg';

const ROAD = 'M-20 380L120 380C220 380 260 200 360 200S500 380 600 380S740 200 840 200S980 380 1080 380L1220 380';

const ITEMS = [
    {
        img: plot1,
        alt: 'салют',
        x: 120,
        y: 380,
        text: (
            <>
                хочешь новые <br />
                впечатления
            </>
        ),
    },
    {
        img: plot2,
        alt: 'люди вокруг одного',
        x: 360,
        y: 200,
        text: (
            <>
                уверен, что <br />
                ты лучший
            </>
        ),
    },
    { img: plot3, alt: 'забег', x: 600, y: 380, text: <>Хочешь посоревноваться</> },
    {
        img: plot4,
        alt: 'банк',
        x: 840,
        y: 200,
        text: (
            <>
                Хочешь <br />
                деньги
            </>
        ),
    },
    {
        img: plot5,
        alt: 'пьедестал с кубком',
        x: 1080,
        y: 380,
        text: (
            <>
                хочешь быть <br />
                победителем
            </>
        ),
    },
];

export const Tiles = () => (
    <section className={styles.tiles}>
        <div className={styles.title}>
            <h2>ЕСЛИ</h2>
        </div>

        <div className={styles.route}>
            <svg className={styles.route_svg} viewBox="0 0 1200 520" aria-hidden="true">
                <path d={ROAD} className={styles.road} />
                <path d={ROAD} className={styles.road_line} />
            </svg>
            {ITEMS.map((it) => (
                <img
                    key={it.alt}
                    src={it.img}
                    alt={it.alt}
                    className={styles.plot}
                    style={{ left: `${((it.x - 110) / 1200) * 100}%`, top: `${((it.y - 117) / 520) * 100}%` }}
                />
            ))}
            {ITEMS.map((it) => (
                <span key={it.alt} className={styles.route_label} style={{ left: `${((it.x - 100) / 1200) * 100}%`, top: it.y > 300 ? '87.5%' : '3.8%' }}>
                    {it.text}
                </span>
            ))}
        </div>

        <ul className={styles.route_mobile}>
            {ITEMS.map((it) => (
                <li key={it.alt}>
                    <img src={it.img} alt={it.alt} className={styles.plot_m} />
                    <span>{it.text}</span>
                </li>
            ))}
        </ul>
    </section>
);

export default Tiles;
