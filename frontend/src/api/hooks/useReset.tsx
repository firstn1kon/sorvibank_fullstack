import { useMutation } from '@tanstack/react-query';
import { postReset } from '../../components/app/auth';
import { useNavigate } from 'react-router';
import { ApiError } from '../clients';
import { toast } from 'sonner';
import Error from '../../components/Error/Error';
import ProgressBarToast from '../../components/ui/toast/ProgressBarToast';

export const useReset = () => {
    const navigate = useNavigate();
    return useMutation<Awaited<ReturnType<typeof postReset>>, ApiError, Parameters<typeof postReset>[0]>({
        mutationFn: postReset,
        onSuccess: () => {
            toast.success(<ProgressBarToast message={'Пароль изменен, войдите c новым паролем'} duration={5} />, {
                action: {
                    label: 'Войти',
                    onClick: () => navigate('/login'),
                },
                duration: 5000,
                onDismiss: () => navigate('/login'),
                onAutoClose: () => navigate('/login'),
            });
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });
};
