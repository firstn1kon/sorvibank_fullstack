import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logout } from '../../components/app/auth';

export const useLogout = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            qc.setQueryData(['me'], null);
            qc.clear();
        },
    });
};
