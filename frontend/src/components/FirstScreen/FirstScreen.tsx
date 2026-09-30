import styles from './firstScreen.module.css';
import logo from '../../assets/logo.svg';
import circles from '../../assets/circles.svg';
import { useNavigate } from 'react-router';
import LoginFrom from '../LoginForm/LoginForm';
import useModal from '../Modal/useModal';
import ProfileIcon from '../ui/icons/ProfileIcon';
import { useFetchme } from '../../api/hooks/useFetchMe';
import { useEffect } from 'react';
import DotLoader from '../ui/loaders/DotLoader';
function FirstScreen() {
    const { openModal, renderModal, closeModal } = useModal({ Component: <LoginFrom /> });

    const navigate = useNavigate();

    const { data: user, isLoading } = useFetchme();

    const navigateToLK = () => {
        if (!user) {
            openModal();
        } else {
            navigate('/me/main');
        }
    };

    useEffect(() => {
        if (user && renderModal) {
            closeModal();
        }
    }, [user, closeModal, renderModal]);

    return (
        <section className={styles.mainScreen}>
            <div className="container">
                <button onClick={navigateToLK} className={styles.btnLk}>
                    <ProfileIcon />
                    {user?.name ?? (isLoading ? <DotLoader bg={'#fff'} /> : 'Войти')}
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
