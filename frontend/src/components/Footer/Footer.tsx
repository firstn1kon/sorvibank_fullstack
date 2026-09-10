import styles from "./footer.module.css"
import logo from "../../assets/logoinvert.svg"
import youtube from "../../assets/icon-yt.svg"
import telegram from "../../assets/icon-telegram.svg"


const date = new Date()
const year = date.getFullYear()

const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <img className={styles.logo} src={logo} alt="logo" />
                    <div className={styles.copyright}>Сорвибанк 2024 - {year}</div>
                    <div className={styles.social}>
                        <a href ="#" className={styles.network}>
                            <img src={youtube} alt="youtube" />
                        </a>
                        <a href ="#" className={styles.network}>
                            <img src={telegram} alt="telegram" />
                        </a>
                    </div>
                </div>
            </div>


        </footer>
    )
}

export default Footer