// AuthProviderWrapper.tsx
import { ReactNode } from 'react';
import { AuthContextProvider } from '@/context/AuthContext';

interface Props {
    children: ReactNode;
}

const AuthProviderWrapper = ({ children }: Props) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
};

export default AuthProviderWrapper;
