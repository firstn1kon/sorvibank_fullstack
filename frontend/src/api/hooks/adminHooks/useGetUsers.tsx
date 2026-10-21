import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../components/app/auth';
import { UsersFilters } from '../../../components/app/auth';

export const useGetUsers = (filters: UsersFilters) => {
    return useQuery({
        queryFn: () => getUsers(filters),
        queryKey: ['users', filters],
    });
};
