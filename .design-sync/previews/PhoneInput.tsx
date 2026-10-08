import { useState } from 'react';
import { PhoneInput } from 'sorvibank-ui';

const Field = (props: { initial?: string; error?: string }) => {
    const [value, setValue] = useState(props.initial ?? '');
    return (
        <div style={{ width: 360 }}>
            <PhoneInput value={value} error={props.error} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
};

export const Empty = () => <Field />;

export const Filled = () => <Field initial="+7 (916) 123-45-67" />;

export const WithError = () => <Field initial="+7 (916) 12" error="укажите телефон полностью" />;
