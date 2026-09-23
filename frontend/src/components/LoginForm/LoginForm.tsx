import Input from '../ui/input/Input';
import PasswordInput from '../ui/input/PasswordInput';
import Button from '../ui/button/Button';
import styles from './loginform.module.css';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router';
import { useLogin } from '../../api/hooks/useLogin';
import Error from '../Error/Error';
import DotLoader from '../ui/loaders/DotLoader';

interface ILoginForm {
    login: string;
    password: string;
}

const LoginFrom = () => {
    const {
        control,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<ILoginForm>({ mode: 'onChange', defaultValues: { login: '', password: '' } });

    const { mutate: doLogin, error, isPending } = useLogin();

    const onSubmit = (data: ILoginForm) => {
        doLogin(data);
    };

    return (
        <div className={`mt-8 ${styles.container}`}>
            <h2 className="mb-7">Вход</h2>
            {error && <Error extraClass="mb-4" data={error?.response?.data} />}
            <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
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
                    render={({ field, fieldState }) => <PasswordInput {...field} error={fieldState.error?.message} />}
                />
                <div className={`pl-3 pr-4 mt-3 ${styles.button_container}`}>
                    <Button disabled={(isDirty && !isValid) || !!errors.login} type="submit" expand>
                        {isPending ? <DotLoader /> : 'Войти'}
                    </Button>
                </div>
                <div className={`mt-7 mb-15 ${styles.links_block}`}>
                    <NavLink to="/restore" className={styles.link}>
                        Восстановить пароль
                    </NavLink>
                    <NavLink to="/signup" className={styles.link}>
                        Зарегистрироваться
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default LoginFrom;
