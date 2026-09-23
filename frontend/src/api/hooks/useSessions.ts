import { useQuery } from '@tanstack/react-query';
import { getSessions } from '../../components/app/auth';

export const useSseions = () => {
    return useQuery({
        queryFn: getSessions,
        queryKey: ['sessions'],
    });
};
