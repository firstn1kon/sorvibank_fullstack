import Input from "./Input"
import { IMyInput } from "./Input"
import { FC, useState } from "react"

interface IPasswordInput extends Omit<IMyInput, "label"> {
    label?: string
}

const PasswordInput:FC<IPasswordInput> = 
    (
        {
            value,
            label="Пароль",
            onChange,
            onBlur,
            name="password",
            extraClass,
            placeholder="введите пароль",
            disabled,
            error,
        }
    ) => {

    const [isVisible, setIsVisible] = useState(true)

    const onIconClick = () => {
        setIsVisible(prev => !prev)
    }

    return (
        <Input 
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            type={isVisible ? "password" : "text"}
            icon={isVisible ? "PasswordIconCrossed" : "PasswordIcon"}
            extraClass={extraClass}
            onIconClick={onIconClick}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
        />
    )
}

export default PasswordInput