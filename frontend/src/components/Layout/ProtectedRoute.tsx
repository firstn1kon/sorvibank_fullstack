import { useLocation, Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../stores/useAuthStroe';
import { useFetchme } from '../../api/hooks/useFetchMe';

const ProtectedRoute = ({ onlyUnAuth = false }: { onlyUnAuth: boolean }) => {
    const { data: user } = useFetchme();
    const isCkechedAuth = useAuthStore((state) => state.isCkechedAuth);
    const location = useLocation();

    if (!isCkechedAuth) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = () => <ProtectedRoute onlyUnAuth={true} />;
