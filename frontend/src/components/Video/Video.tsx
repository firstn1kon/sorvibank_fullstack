import styles from "./video.module.css"
import play from "../../assets/btn-play.svg"
import YtVideo from "./YtVideo/YtVideo"
import { useState } from "react"
const Video = () => {
    const [isPlay, setIsPlay] = useState(false)

    const handleClickPlay = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsPlay(true)
    }
    return (
        <section className={styles.video}>
            <div className="container">
                <div className={styles.preview}>
                    <div className={styles.play}>
                        {isPlay ? <YtVideo/> : <a href="#" onClick={handleClickPlay}><img src={play} alt="смотреть"></img>смотреть</a>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Video