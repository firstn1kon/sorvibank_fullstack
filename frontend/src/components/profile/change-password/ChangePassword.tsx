import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styles from '../../ResetForm/resetform.module.css';
import ownStyles from './changePassword.module.css';
import PasswordInput from '../../ui/input/PasswordInput';
import Button from '../../ui/button/Button';
import DotLoader from '../../ui/loaders/DotLoader';
import WarningIcon from '../../ui/icons/WarningIcon';
import { useMutation } from '@tanstack/react-query';
import { postChangePassword } from '../../app/auth';
import Error from '../../Error/Error';
import { ApiError } from '../../../api/clients';
import { toast } from 'sonner';

export interface DataChangePassword {
    currentPassword: string;
    password: string;
    passwordAgain: string;
}

const ChangePassword = () => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { isDirty, isValid, errors },
    } = useForm<DataChangePassword>({ mode: 'onTouched', defaultValues: { currentPassword: '', password: '', passwordAgain: '' } });

    const password = watch('password');
    const currentPassword = watch('currentPassword');

    const {
        mutate: doChangePasswotd,
        error,
        isPending,
    } = useMutation<Awaited<ReturnType<typeof postChangePassword>>, ApiError, Parameters<typeof postChangePassword>[0]>({
        mutationFn: postChangePassword,
        onSuccess: (data) => {
            reset();
            toast.success(`${data.message}`, {
                duration: 5000,
            });
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });

    const onSubmit = (data: DataChangePassword) => {
        doChangePasswotd(data);
    };
    return (
        <div className={`mt-2 ${styles.container}`}>
            <div className={ownStyles.warning}>
                <div className={ownStyles.icon}>
                    <WarningIcon fill="#F59E0B" width="34px" height="34px" />
                </div>
                <div>
                    <p>После смены пароля будет осуществлен выход со всех устройств кроме текущего</p>
                </div>
            </div>
            {error && <Error extraClass="mt-4 mb-4" data={error?.response?.data} />}
            <form className={styles.reset_form} style={{ marginTop: '30px' }} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="currentPassword"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: { value: 8, message: 'минимум 8 символов' },
                    }}
                    render={({ field, fieldState }) => (
                        <PasswordInput {...field} label="Текущий пароль" placeholder="текущий пароль" error={fieldState.error?.message} />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'обязательное поле',
                        minLength: { value: 8, message: 'минимум 8 символов' },
                        validate: (value) => value !== currentPassword || 'Новый и текущий пароль не должны совпадать',
                    }}
                    render={({ field, fieldState }) => (
                        <PasswordInput {...field} placeholder="новый пароль" label="Новый пароль" error={fieldState.error?.message} />
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
                            placeholder="повторите новый пароль"
                            label="Новый пароль еще раз"
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <div className={`pl-3 pr-4 mt-3 ${styles.button_container}`}>
                    <Button extraClass="mb-15" disabled={(isDirty && !isValid) || !!errors.passwordAgain} type="submit" expand>
                        {isPending ? <DotLoader /> : 'Сменить пароль'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
