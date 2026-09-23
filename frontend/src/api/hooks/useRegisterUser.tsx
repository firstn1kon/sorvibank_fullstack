import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { postRegister } from '../../components/app/auth';
import type { ApiError } from '../clients';
import Error from '../../components/Error/Error';
import { toast } from 'sonner';

export const useRegisterUser = () => {
    const navigate = useNavigate();
    return useMutation<Awaited<ReturnType<typeof postRegister>>, ApiError, Parameters<typeof postRegister>[0]>({
        mutationFn: postRegister,
        onSuccess: () => navigate('/login'),
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />, {
                duration: 5000,
            });
        },
    });
};
