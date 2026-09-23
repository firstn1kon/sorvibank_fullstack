import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../../components/app/auth';

export const useFetchme = () => {
    return useQuery({
        queryFn: fetchMe,
        queryKey: ['me'],
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};
