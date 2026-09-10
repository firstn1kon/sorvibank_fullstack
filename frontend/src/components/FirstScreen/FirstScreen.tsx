import styles from './firstScreen.module.css';
import logo from '../../assets/logo.svg';
import circles from '../../assets/circles.svg';
import { useNavigate } from 'react-router';
import LoginFrom from '../LoginForm/LoginForm';
import useModal from '../Modal/useModal';
import { useState } from 'react';
import ProfileIcon from '../ui/icons/ProfileIcon';
function FirstScreen() {
    const { openModal, renderModal } = useModal({ Component: <LoginFrom /> });

    const navigate = useNavigate();

    const [user] = useState(false);

    const navigateToLK = () => {
        if (user) navigate('/login');
        openModal();
    };

    return (
        <section className={styles.mainScreen}>
            <div className="container">
                <button onClick={navigateToLK} className={styles.btnLk}>
                    <ProfileIcon />
                    <span>Личный кабинет</span>
                </button>
                <div className={styles.logo}>
                    <img className={styles.logo_img} src={logo} alt="sorvibank" />
                    <div className={styles.slogan}>
                        Забери <span>все</span> или ничего <p>Аутдор игра нового поколения</p>
                    </div>
                </div>
            </div>
            <img className={styles.circles} src={circles} alt="circles" />
            {renderModal}
        </section>
    );
}

export default FirstScreen;
