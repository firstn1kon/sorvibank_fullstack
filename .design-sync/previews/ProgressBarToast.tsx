import { ProgressBarToast } from 'sorvibank-ui';

export const Default = () => (
    <div
        style={{
            width: 340,
            padding: '16px 16px 20px',
            borderRadius: 8,
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,.1)',
            fontSize: 14,
        }}
    >
        <ProgressBarToast message="Пароль успешно изменён" duration={60} />
    </div>
);
