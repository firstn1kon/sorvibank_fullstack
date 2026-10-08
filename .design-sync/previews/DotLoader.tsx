import { DotLoader } from 'sorvibank-ui';

export const OnLight = () => <DotLoader />;

export const OnDark = () => (
    <div style={{ background: '#2b2b2b', padding: '8px 24px', borderRadius: 20, display: 'inline-block' }}>
        <DotLoader bg="#fff" />
    </div>
);

export const Brand = () => <DotLoader bg="#ffd544" />;
