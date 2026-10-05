import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logout } from '../../components/app/auth';
import { toast } from 'sonner';
import { ApiError } from '../clients';
import Error from '../../components/Error/Error';

export const useLogout = () => {
    const qc = useQueryClient();
    return useMutation<Awaited<ReturnType<typeof logout>>, ApiError>({
        mutationFn: logout,
        onSuccess: (data) => {
            window.location.replace('/');
            qc.setQueryData(['me'], null);
            qc.clear();
            toast.success(data.message, {
                duration: 5000,
            });
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });
};
