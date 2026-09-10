import styles from './input.module.css';
import { FC, useRef } from 'react';
import * as Icons from './icons';
import { TIcons } from './icons';
import clsx from 'clsx';
import InputMask from '@mona-health/react-input-mask';
import { useMemo, useCallback } from 'react';

export interface IMyInput extends React.HTMLProps<HTMLInputElement> {
    label: string;
    placeholder?: string;
    error?: string;
    value: string;
    bg?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    extraClass?: string;
    name?: string;
    onChange?(_e: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(_e: React.FocusEvent<HTMLInputElement>): void;
    onIconClick?(_e: React.MouseEvent<HTMLDivElement>): void;
    icon?: TIcons;
    disabled?: boolean;
    isMask?: boolean;
    maskPlaceholder?: string;
    mask?: string;
}

const Input: FC<IMyInput> = ({
    bg = 'rgb(255, 255, 255)',
    label,
    placeholder,
    error,
    value,
    type,
    extraClass = '',
    name,
    onChange,
    onBlur,
    icon,
    disabled,
    onIconClick,
    isMask,
    maskPlaceholder,
    mask,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClickProxy = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (typeof onIconClick === 'function') {
                e.stopPropagation();
                onIconClick(e);
                inputRef?.current?.focus();
            }
        },
        [onIconClick]
    );

    const iconRender = useMemo(() => {
        const Icon = icon && Icons[icon];
        return Icon ? (
            <div onClick={onIconClickProxy} className={clsx(styles.icon, { [styles.icon_click]: onIconClick })}>
                <Icon />
            </div>
        ) : null;
    }, [icon, onIconClickProxy, onIconClick]);

    return (
        <>
            <div
                style={{ background: bg }}
                className={clsx(styles.input_container, {
                    [styles.input_status_disabled]: disabled,
                    [extraClass]: extraClass,
                })}
            >
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
                {isMask ? (
                    <InputMask
                        mask={mask}
                        value={value}
                        className={clsx(styles.input, { [styles.error_value]: error })}
                        onChange={onChange}
                        onBlur={onBlur}
                        maskPlaceholder={maskPlaceholder}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...rest}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        disabled={disabled}
                        id={name}
                        className={clsx(styles.input, { [styles.error_value]: error })}
                        value={value}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...rest}
                    />
                )}
                {iconRender}
            </div>
            <div className={clsx(styles.error, { [styles.error_active]: error })}>{error}</div>
        </>
    );
};

export default Input;
