import { useState } from 'react';
import { PasswordInput } from 'sorvibank-ui';

const Field = (props: { initial?: string; label?: string; error?: string; disabled?: boolean }) => {
    const [value, setValue] = useState(props.initial ?? '');
    return (
        <div style={{ width: 360 }}>
            <PasswordInput
                label={props.label}
                value={value}
                error={props.error}
                disabled={props.disabled}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export const Empty = () => <Field />;

export const Filled = () => <Field initial="SorviKush2026" />;

export const WithError = () => <Field initial="1234" error="минимум 8 символов" />;

export const CustomLabel = () => <Field label="Новый пароль" />;
