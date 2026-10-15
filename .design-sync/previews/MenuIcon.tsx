import { MenuIcon } from 'sorvibank-ui';

export const Default = () => <MenuIcon />;

export const OnDarkButton = () => (
    <button
        type="button"
        aria-label="Меню"
        style={{ background: '#2b2b2b', border: 0, borderRadius: 12, padding: 12, display: 'flex', cursor: 'pointer' }}
    >
        <MenuIcon />
    </button>
);
