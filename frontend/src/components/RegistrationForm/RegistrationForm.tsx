import PhoneInput from '../ui/input/PhoneInput';
import PasswordInput from '../ui/input/PasswordInput';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import { Controller, useForm } from 'react-hook-form';
import styles from './registrationForm.module.css';
import { useRegisterUser } from '../../api/hooks/useRegisterUser';
import Error from '../Error/Error';
import DotLoader from '../ui/loaders/DotLoader';
interface IRegistrationFrom {
    name: string;
    login: string;
    phone: string;
    password: string;
    passwordAgain: string;
}

const RegistrationForm = () => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { isDirty, isValid, errors },
    } = useForm<IRegistrationFrom>({
        mode: 'onChange',
        defaultValues: { name: '', password: '', passwordAgain: '', phone: '', login: '' },
    });

    const password = watch('password');

    const { mutate: registerUser, error, isPending } = useRegisterUser();

    const onSubmit = (data: IRegistrationFrom) => {
        registerUser(data);
    };

    return (
        <div className={`mt-8 ${styles.container}`}>
            <h2 className="mb-7">Регистрация</h2>
            {error && <Error extraClass="mb-4" data={error?.response?.data} />}
            <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: {
                            value: 2,
                            message: 'Минимум 2 символа',
                        },
                        // pattern: {
                        //     value: /^[А-Яа-яЁё]+$/,
                        //     message: 'Только кириллица',
                        // },
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            label="Имя"
                            placeholder="введите свое имя"
                            error={fieldState.error?.message}
                            type="text"
                            name="login"
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        validate: (value) => value.replace(/\D/g, '').length === 11 || 'Введите полностью телефон',
                    }}
                    render={({ field, fieldState }) => (
                        <PhoneInput
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                setValue('phone', e.target.value);
                            }}
                            label="Телефон"
                            placeholder="укажите телефон"
                            error={fieldState.error?.message}
                            type="text"
                            name="phone"
                        />
                    )}
                />

                <Controller
                    name="login"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        pattern: {
                            value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                            message: 'формат email@email.ru',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            {...field}
                            label="Логин"
                            placeholder="email@email.ru"
                            error={fieldState.error?.message}
                            type="text"
                            name="login"
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
                        <PasswordInput {...field} label="Пароль" error={fieldState.error?.message} />
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
                    <Button extraClass="mb-15" disabled={(isDirty && !isValid) || !!errors.name} type="submit" expand>
                        {isPending ? <DotLoader /> : 'Зарегистрироваться'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
