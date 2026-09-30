import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../../components/app/auth';
import { toast } from 'sonner';
import Error from '../../components/Error/Error';
import { ApiError } from '../clients';
export const useDeleteSession = () => {
    const qc = useQueryClient();
    return useMutation<Awaited<ReturnType<typeof deleteSession>>, ApiError, Parameters<typeof deleteSession>[0]>({
        mutationFn: deleteSession,
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ['me'] });
            qc.invalidateQueries({ queryKey: ['sessions'] });
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
