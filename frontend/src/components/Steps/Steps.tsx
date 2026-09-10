import styles from "../Steps/steps.module.css"
import step1 from "../../assets/step-01.svg"
import step2 from "../../assets/step-02.svg"
import step3 from "../../assets/step-03.svg"
import step4 from "../../assets/step-04.svg"
import step5 from "../../assets/step-05.svg"

const Steps = () => {
    return (
        <section className={styles.steps_background}>
           <div className="container">
                <div className={styles.title}>
                    <h2>КАК</h2>
                    <h3>принять участие</h3>
                </div>
                <div className={styles.steps}>
                    <div className={styles.wrapper}>
                        <div className={styles.step}><img src={step1} alt="регистрируешься" /></div>
                        <span className={styles.title_step}>Заходишь в игру</span>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.step}><img src={step2} alt="старт" /></div>
                        <span className={styles.title_step}>Дожидаешься старта</span>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.step}><img src={step3} alt="заданное место" /></div>
                        <span className={styles.title_step}>Приезжаешь в заданное место</span>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.step}>123<span style={{color: "#ffd544"}}>.</span></div>
                        <span className={styles.title_step}>Находишь код</span>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.step}><img src={step4} alt="вводишь первым" /></div>
                        <span className={styles.title_step}>Вводишь его первым</span>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.step}><img src={step5} alt="попеда" /></div>
                        <span className={styles.title_step}>Побеждаешь</span>
                    </div>
                </div>
                
           </div>
        </section>
    )
}

export default Steps