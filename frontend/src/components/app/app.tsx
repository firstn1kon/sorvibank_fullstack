import { Home, Login, Restore, SignUp, Reset } from '../../pages';
import MainLayout from '../Layout/MainLayout';
import NotFound from '../404/NotFound';
import { Routes, Route, useLocation } from 'react-router';
import { useFetchme } from '../../api/hooks/useFetchMe';
import { Toaster } from 'sonner';
import { useAuthStore } from '../../stores/useAuthStroe';
import { useEffect } from 'react';
import { OnlyUnAuth } from '../Layout/ProtectedRoute';
import { OnlyAuth } from '../Layout/ProtectedRoute';
import ProfileMain from '../profile/ProfileMain';

function App() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const { data: user, isError } = useFetchme();
    const location = useLocation();

    useEffect(() => {
        if (user) setAuth();
    }, [user, setAuth]);

    useEffect(() => {
        if (isError) setAuth();
    }, [isError, setAuth]);

    return (
        <>
            <Toaster
                position="top-right"
                richColors
                expand
                closeButton
                visibleToasts={5}
                toastOptions={{
                    style: {
                        marginTop: '100px',
                    },
                }}
            />
            <Routes location={location}>
                <Route element={<MainLayout />}>
                    //Public Routes
                    <Route path="/" element={<Home />} />
                    // OnlyUnAuth routes
                    <Route element={<OnlyUnAuth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="restore" element={<Restore />} />
                        <Route path="reset-password" element={<Reset />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                    // OnlyAuth routes
                    <Route element={<OnlyAuth onlyUnAuth={false} />}>
                        <Route path="me/main" element={<ProfileMain />} />
                    </Route>
                </Route>
                // Route 404
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
