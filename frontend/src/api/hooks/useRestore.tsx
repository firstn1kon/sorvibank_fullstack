import { useMutation } from '@tanstack/react-query';
import { postRestore } from '../../components/app/auth';
import type { ApiError } from '../clients';
import { useNavigate } from 'react-router';
import Error from '../../components/Error/Error';
import { toast } from 'sonner';

export const useRestore = () => {
    const navigate = useNavigate();
    return useMutation<Awaited<ReturnType<typeof postRestore>>, ApiError, Parameters<typeof postRestore>[0]>({
        mutationFn: postRestore,
        onSuccess: () => {
            toast.success('Код направлен на email', {
                duration: 5000,
            });
            navigate('/reset-password');
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });
};
