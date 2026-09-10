import styles from "./mapSection.module.css"
import iphone from "../../assets/iphone.png"
import map from "../../assets/map-icon3.svg"
import coin from "../../assets/map-icon1.svg"
import point from "../../assets/map-icon2.svg"
import code from "../../assets/map-icon4.svg"


const MapSection = () => {
    return (
        <section className={styles.map}>
            <div className="container">
                <div className={styles.title}>
                    <h2>ТО</h2>
                    <h3>SORVIBANK это то, что тебе нужно
                    Так что же это такое?</h3>
                </div>
                <div className={styles.desc}>
                    <div className={styles.phone}>
                        <img  src={iphone} alt="карта" />
                    </div>
                    <div className={styles.points}>
                        <span className={styles.header}>У тебя есть карта поделенная на квадраты </span>
                        <div className={styles.map_items}>
                            <div className={styles.map_item}>
                                <img src={coin} alt="монета"></img>
                                <span>Где-то на территории Москвы спрятана монета с кодом</span>
                            </div>
                            <div className={styles.map_item}>
                                <img src={map} alt="карта"></img>
                                <span>Каждые 20 минут открывается новый кусок карты</span>
                            </div>
                            <div className={styles.map_item}>
                                <img src={point} alt="точка"></img>
                                <span>В конечной точке мы оставили метку. В радиусе 5 метров от нее спрятана монета с кодом</span>
                            </div>
                            <div className={styles.map_item}>
                                <img src={code} alt="код"></img>
                                <span>Найди монету, введи код, сорви банк</span>
                            </div>
                            <span className={`${styles.post_description} ${styles.desktop}`}>Будь быстрее, хитрее, умнее остальных и найди монету с кодом первым!</span>
                        </div>
                       
                    </div>
                </div>
                <span className={`${styles.post_description} ${styles.mobile}`}>Будь быстрее, хитрее, умнее остальных и найди монету с кодом первым!</span>
            </div>
        </section>
    )
}

export default MapSection