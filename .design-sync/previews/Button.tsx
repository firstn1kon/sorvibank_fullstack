import { Button, DotLoader } from 'sorvibank-ui';

export const Sizes = () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button size="small">Войти</Button>
        <Button size="medium">Войти</Button>
        <Button size="large">Войти</Button>
    </div>
);

export const Disabled = () => <Button disabled>Войти</Button>;

export const Expanded = () => (
    <div style={{ width: 360 }}>
        <Button type="submit" expand>
            Зарегистрироваться
        </Button>
    </div>
);

export const Loading = () => (
    <Button type="submit" size="large">
        <DotLoader />
    </Button>
);
