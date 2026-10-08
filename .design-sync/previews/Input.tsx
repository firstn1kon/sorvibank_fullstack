import { useState } from 'react';
import { Input } from 'sorvibank-ui';

const Field = (props: { label: string; initial?: string; placeholder?: string; error?: string; disabled?: boolean }) => {
    const [value, setValue] = useState(props.initial ?? '');
    return (
        <div style={{ width: 360 }}>
            <Input
                label={props.label}
                name={props.label}
                value={value}
                placeholder={props.placeholder}
                error={props.error}
                disabled={props.disabled}
                type="text"
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export const Empty = () => <Field label="Логин" placeholder="email@email.ru" />;

export const Filled = () => <Field label="Имя" initial="Анна" placeholder="введите свое имя" />;

export const WithError = () => (
    <Field label="Логин" initial="anna@mail" placeholder="email@email.ru" error="формат email@email.ru" />
);

export const Disabled = () => <Field label="Логин" initial="anna@mail.ru" disabled />;
