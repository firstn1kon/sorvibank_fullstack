import styles from './checkbox.module.css';
import { Check } from '../icons/Check';
import clsx from 'clsx';

interface CheckBoxProps {
    onCheckedChange?: (v: boolean) => void;
    children?: React.ReactNode;
    checked?: boolean;
}

const CheckBox = ({ onCheckedChange, children, checked }: CheckBoxProps) => {
    const handleChange = () => {
        if (onCheckedChange) {
            onCheckedChange(!checked);
        }
    };
    return (
        <button type="button" className={clsx(styles.chip, styles.toggle, [checked && styles.toggleOn])} onClick={handleChange}>
            <span className={styles.checkbox}>
                <Check size={12} width={3.4} />
            </span>
            {children}
        </button>
    );
};

export default CheckBox;
