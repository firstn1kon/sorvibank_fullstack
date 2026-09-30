import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutAll } from '../../components/app/auth';
import { toast } from 'sonner';
import Error from '../../components/Error/Error';
import { ApiError } from '../clients';
export const useLogoutAll = () => {
    const qc = useQueryClient();
    return useMutation<Awaited<ReturnType<typeof logoutAll>>, ApiError>({
        mutationFn: logoutAll,
        onSuccess: (data) => {
            qc.setQueryData(['me'], null);
            qc.clear();
            toast.success(`${data.message}`, {
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
