import Input from './Input';
import { IMyInput } from './Input';
import { FC } from 'react';

interface IPhoneInput extends Omit<IMyInput, 'label'> {
    label?: string;
}
const PhoneInput: FC<IPhoneInput> = ({
    value,
    label = 'Телефон',
    onChange,
    name = 'phone',
    placeholder = '+7 (___) ___-__-__',
    mask = '+7 (999) 999-99-99',
    maskPlaceholder = '_',
    ...rest
}) => {
    return (
        <Input
            label={label}
            placeholder={placeholder}
            isMask
            name={name}
            value={value}
            mask={mask}
            maskPlaceholder={maskPlaceholder}
            onChange={onChange}
            {...rest}
        />
    );
};

export default PhoneInput;
