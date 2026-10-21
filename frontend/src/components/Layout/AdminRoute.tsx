import { useLocation, Navigate, Outlet } from 'react-router';
import { useFetchme } from '../../api/hooks/useFetchMe';

const AdminRoute = () => {
    const { data: user, isPending } = useFetchme();
    const location = useLocation();

    // if (!user) {
    //     return <Navigate to="/login" state={{ from: location }} />;
    // }

    if (isPending) {
        return null;
    }

    if (user?.role !== 'ADMIN') {
        return 'Недостаточно прав';
        // return <Navigate to="/" replace />
    }

    return <Outlet />;
};

export const OnlyAdmin = AdminRoute;
