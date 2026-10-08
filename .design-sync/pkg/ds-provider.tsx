// Root wrapper for designs built with the Sorvibank components: the same
// providers frontend/src/main.tsx sets up (react-query + router), with an
// in-memory router so it works outside the real app, plus the sonner Toaster.
import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { Toaster } from 'sonner';

export interface SorvibankProviderProps {
    children: ReactNode;
    /** Initial route for the in-memory router (default "/"). */
    initialPath?: string;
}

const SorvibankProvider: FC<SorvibankProviderProps> = ({ children, initialPath = '/' }) => {
    const [client] = useState(
        () => new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }),
    );
    return (
        <QueryClientProvider client={client}>
            <MemoryRouter initialEntries={[initialPath]}>
                {children}
                <Toaster position="top-right" />
            </MemoryRouter>
        </QueryClientProvider>
    );
};

export default SorvibankProvider;
