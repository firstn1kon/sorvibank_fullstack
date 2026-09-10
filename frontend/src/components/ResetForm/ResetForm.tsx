import styles from './resetform.module.css';
import Input from '../ui/input/Input';
import PasswordInput from '../ui/input/PasswordInput';
import { Controller, useForm } from 'react-hook-form';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router';

interface IResetForm {
    code: string;
    password: string;
    passwordAgain: string;
}

const ResetForm = () => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isDirty, isValid, errors },
    } = useForm<IResetForm>({ mode: 'onChange', defaultValues: { code: '', password: '', passwordAgain: '' } });

    const password = watch('password');

    const navigate = useNavigate();

    const onSubmit = (data: IResetForm) => {
        console.log(data);
        reset();
        navigate('/login');
    };
    return (
        <div className={`mt-8 ${styles.container}`}>
            <h2 className="mb-7">Установите новый пароль</h2>
            <form className={styles.reset_form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="code"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: {
                            value: 6,
                            message: '6 значный код',
                        },
                        maxLength: {
                            value: 6,
                            message: '6 значный код',
                        },
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'код содержит только цифры',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            label="Код"
                            placeholder="код из письма"
                            error={fieldState.error?.message}
                            type="text"
                            name="code"
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: { value: 8, message: 'минимум 8 символов' },
                    }}
                    render={({ field, fieldState }) => (
                        <PasswordInput {...field} label="Новый пароль" error={fieldState.error?.message} />
                    )}
                />
                <Controller
                    name="passwordAgain"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: { value: 8, message: 'минимум 8 символов' },
                        validate: (value) => value === password || 'Пароли не совпадают',
                    }}
                    render={({ field, fieldState }) => (
                        <PasswordInput
                            {...field}
                            name="passwordAgain"
                            placeholder="повторите пароль"
                            label="Пароль еще раз"
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <div className={`pl-3 pr-4 mt-3 ${styles.button_container}`}>
                    <Button extraClass="mb-15" disabled={(isDirty && !isValid) || !!errors.code} type="submit" expand>
                        Установить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ResetForm;
