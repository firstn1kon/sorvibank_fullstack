import { Home, Login, Restore, SignUp } from '../../pages';
import ResetForm from '../ResetForm/ResetForm';
import MainLayout from '../Layout/MainLayout';
import NotFound from '../404/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="restore" element={<Restore />} />
                    <Route path="reset-password" element={<ResetForm />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
