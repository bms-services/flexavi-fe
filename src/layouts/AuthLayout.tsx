import { useAuth } from '@/hooks/use-auth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {

    const { token } = useAuth();

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <header>
            </header>
            <main>
                <Outlet />

            </main>
        </div>
    );
};

export default AuthLayout;
