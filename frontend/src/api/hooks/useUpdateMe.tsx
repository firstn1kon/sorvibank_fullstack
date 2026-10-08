import { toast } from 'sonner';
import { patchMe } from '../../components/app/auth';
import { useMutation } from '@tanstack/react-query';
import Error from '../../components/Error/Error';
import { ApiError } from '../clients';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateMe = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void } = {}) => {
    const qc = useQueryClient();
    return useMutation<Awaited<ReturnType<typeof patchMe>>, ApiError, Parameters<typeof patchMe>[0]>({
        mutationFn: patchMe,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['me'] });
            toast.success('Имя изменено');
            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (error) => {
            toast.error(<Error data={error.response?.data} />);
            if (onError) {
                onError();
            }
        },
    });
};
