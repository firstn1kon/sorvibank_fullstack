import { FC } from 'react';
import styles from './modal.module.css';

interface IModalOverlay {
    close: () => void;
}

const Overlay: FC<IModalOverlay> = ({ close }) => {
    return <div className={styles.overlay} onClick={close}></div>;
};

export default Overlay;
