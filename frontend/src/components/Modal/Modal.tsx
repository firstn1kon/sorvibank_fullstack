import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';
import { useLayoutEffect } from 'react';
import styles from './modal.module.css';
import { getScrollbarWidth } from './utils';

interface IModal {
    children: React.ReactNode;
    close: () => void;
}

const Modal: FC<IModal> = ({ children, close }) => {
    const [node] = useState(() => document.createElement('div'));

    useLayoutEffect(() => {
        const closeByEscape = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                close();
            }
        };
        const widthScrollBar = getScrollbarWidth();
        document.body.appendChild(node);
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${widthScrollBar}px`;
        window.addEventListener('keyup', closeByEscape);
        return () => {
            document.body.removeChild(node);
            document.body.removeAttribute('style');
            window.removeEventListener('keyup', closeByEscape);
        };
    }, [node, close]);

    return createPortal(
        <>
            <Overlay close={close} />
            <div className={` ${styles.modal}`}>
                {children}
                <div className={styles.close} onClick={close}>
                    <svg width="100%" height="100%" viewBox="0 0 18 18" fill="" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.00001 10.8428L16.15 17.9928L17.5642 16.5786L10.4142 9.42857L17.5643 2.27851L16.1501 0.864296L9.00001 8.01436L1.84994 0.864296L0.43573 2.27851L7.58579 9.42857L0.435787 16.5786L1.85 17.9928L9.00001 10.8428Z"
                            fill="rgb(0, 0, 0)"
                        ></path>
                    </svg>
                </div>
            </div>
        </>,
        node
    );
};

export default Modal;
