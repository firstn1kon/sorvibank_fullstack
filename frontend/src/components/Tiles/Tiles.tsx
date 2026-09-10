import styles from "./tiles.module.css"
import fireworks from "../../assets/tile-01.png"
import star from "../../assets/tile-03.png"
import sword from "../../assets/tile-05.png"
import coins from "../../assets/tile-02.png"
import cup from "../../assets/tile-04.png"
const Tiles = () => {
    return (
        <>
            <section className={styles.tiles}>
                <div className={styles.title}><h2>ЕСЛИ</h2></div>
                <div className={styles.tiles_flex}>
                    <div className={styles.tiles_item}>
                        <img className={styles.tile_img} src={fireworks} alt="фейрверк"></img>
                        <span>хочешь новые <br></br>впечатления</span>
                    </div>
                    <div className={styles.tiles_item}>
                        <img className={styles.tile_img} src={star} alt="звезда"></img>уверен, что <br></br>ты лучший
                    </div>
                    <div className={styles.tiles_item}>
                        <img className={styles.tile_img} src={sword} alt="мечи"></img>Хочешь посоревноваться
                    </div>
                    <div className={styles.tiles_item}>
                        <img className={styles.tile_img} src={coins} alt="монеты"></img>Хочешь <br></br>деньги
                    </div>
                    <div className={styles.tiles_item}>
                        <img className={styles.tile_img} src={cup} alt="кубок"></img>хочешь быть <br></br>победителем
                    </div>
                </div>
            </section>

        </>
    )
}

export default Tiles