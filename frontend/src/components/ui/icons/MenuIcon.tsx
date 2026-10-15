const MenuIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffd544" aria-hidden="true">
        {[4, 12, 20].flatMap((y) => [4, 12, 20].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />))}
    </svg>
);

export default MenuIcon;
