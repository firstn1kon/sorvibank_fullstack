import { useRef, useState, useEffect } from 'react';
import styles from './customToast.module.css';

interface ProgressBarToast {
    message: string;
    duration: number;
}

const ProgressBarToast = ({ message, duration }: ProgressBarToast) => {
    const [isPaused, setPause] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const li = divRef.current?.closest('[data-sonner-toaster]');
        if (!li) return;
        const handleMouseEnter = () => {
            setPause(true);
        };

        const handleMouseLeave = () => {
            setPause(false);
        };
        li.addEventListener('mouseenter', handleMouseEnter);
        li.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            li.removeEventListener('mouseenter', handleMouseEnter);
            li.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);
    return (
        <div ref={divRef}>
            <div> {message}</div>
            <div
                className={styles.progressBar}
                style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                    animationDuration: `${String(duration)}s`,
                }}
            ></div>
        </div>
    );
};

export default ProgressBarToast;
