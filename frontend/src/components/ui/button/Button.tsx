import { FC, memo } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

interface IButton {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    expand?: boolean;
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    extraClass?: string;
}

const Button: FC<IButton> = memo(
    ({ children, size = 'medium', expand = false, type = 'button', disabled = false, extraClass = '' }) => {
        return (
            <button
                disabled={disabled}
                type={type}
                className={clsx(styles.button, {
                    [styles[`button_${size}`]]: size,
                    [styles.button_expand]: expand,
                    [extraClass]: extraClass,
                })}
            >
                {children}
            </button>
        );
    }
);

export default Button;
