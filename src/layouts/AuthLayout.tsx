import React from 'react';
import { Navigate, Outlet, useMatches } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import LocalizationToggle from "@/components/ui/localization-toggle";
import { useTranslation } from 'react-i18next';
import resources from '@/@types/resources';

type Handle = {
    title?: string;
    description?: string;
};

const AuthLayout: React.FC = () => {
    const { t } = useTranslation('auth');
    const { token } = useAuth();

    const matches = useMatches();
    const currentHandle = matches.find((match) => match.handle)?.handle as Handle;

    if (token) {
        return <Navigate to="/" replace />;
    }

    const safeTranslate = (key?: string) => {
        if (!key) return "";
        return resources[key] || t(key as unknown as TemplateStringsArray) || key;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <LocalizationToggle />
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle>
                        {safeTranslate(currentHandle?.title || 'auth:login.title')}
                    </CardTitle>
                    <CardDescription>
                        {safeTranslate(currentHandle?.description || 'auth:login.description')}
                    </CardDescription>
                </CardHeader>
                <Outlet />
            </Card>
        </div>
    );
};

export default AuthLayout;
