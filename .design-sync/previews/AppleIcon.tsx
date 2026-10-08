import { AppleIcon } from 'sorvibank-ui';

const row = { display: 'flex', gap: 24, alignItems: 'center' } as const;

export const Sizes = () => (
    <div style={row}>
        <AppleIcon width="24px" height="24px" />
        <AppleIcon width="40px" height="40px" />
        <AppleIcon width="56px" height="56px" />
    </div>
);

export const BrandColors = () => (
    <div style={row}>
        <AppleIcon width="40px" height="40px" fill="#ffd544" />
        <div style={{ background: '#2b2b2b', padding: 12, borderRadius: 12, display: 'flex' }}>
            <AppleIcon width="40px" height="40px" fill="#ffffff" />
        </div>
        <AppleIcon width="40px" height="40px" fill="#126df7" />
    </div>
);
