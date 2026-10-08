import { ErrorMessage } from 'sorvibank-ui';

export const Message = () => (
    <div style={{ width: 360 }}>
        <ErrorMessage data={{ message: 'Неверный логин или пароль' }} />
    </div>
);

export const FieldErrors = () => (
    <div style={{ width: 360 }}>
        <ErrorMessage
            data={{
                message: 'Проверьте введённые данные',
                errors: [
                    { field: 'phone', message: 'Телефон уже зарегистрирован' },
                    { field: 'login', message: 'Некорректный email' },
                ],
            }}
        />
    </div>
);
