import { memo } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'dark' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    expand?: boolean;
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    extraClass?: string;
    onClick?: () => void;
}

const Button = memo(
    ({ children, variant = 'primary', size = 'medium', expand = false, type = 'button', disabled = false, extraClass = '', onClick }: ButtonProps) => (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(styles.button, styles[`button_${variant}`], styles[`button_${size}`], { [styles.button_expand]: expand }, extraClass)}
        >
            {children}
        </button>
    ),
);

export default Button;
