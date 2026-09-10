import styles from './restoreform.module.css';
import Input from '../ui/input/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../ui/button/Button';
import { useNavigate } from 'react-router';

interface IRestoreFom {
    login: string;
}

const RestoreForm = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isValid, errors },
    } = useForm<IRestoreFom>({ mode: 'onChange', defaultValues: { login: '' } });

    const navigate = useNavigate();

    const onSubmit = (data: IRestoreFom) => {
        console.log(data);
        reset();
        navigate('/reset-password');
    };
    return (
        <div className={`mt-8 ${styles.container}`}>
            <h2 className="mb-7">Восстановление пароля</h2>
            <form className={styles.restore_form} onSubmit={handleSubmit(onSubmit)}>
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
                <div className={`pl-3 pr-4 mt-3 ${styles.button_container}`}>
                    <Button extraClass="mb-15" disabled={(isDirty && !isValid) || !!errors.login} type="submit" expand>
                        Восстановить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RestoreForm;
