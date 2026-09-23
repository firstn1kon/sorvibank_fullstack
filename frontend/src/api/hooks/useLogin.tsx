import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../../components/app/auth';
import type { ApiError } from '../clients';
import { toast } from 'sonner';
import Error from '../../components/Error/Error';
import { useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
    const qc = useQueryClient();
    return useMutation<Awaited<ReturnType<typeof postLogin>>, ApiError, Parameters<typeof postLogin>[0]>({
        mutationFn: postLogin,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['me'] });
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });
};
