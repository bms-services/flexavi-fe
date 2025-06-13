import React from 'react';
import { Navigate, Outlet, useMatches } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import LocalizationToggle from "@/components/ui/localization-toggle";
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks/usePageTitle';

type Handle = {
    title?: string | (() => string);
    description?: string | (() => string);
};

const AuthLayout: React.FC = () => {
    usePageTitle();

    const { t } = useTranslation();
    const { token } = useAuth();

    const matches = useMatches();
    const currentHandle = matches.find((match) => match.handle)?.handle as Handle;

    if (token) {
        return <Navigate to="/" replace />;
    }

    const resolveHandleValue = (value?: string | (() => string)) =>
        typeof value === "function" ? value() : value || "";

    const titleKey = resolveHandleValue(currentHandle?.title || "auth:login.text.title");
    const descriptionKey = resolveHandleValue(currentHandle?.description || "auth:login.text.description");

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <LocalizationToggle />
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle>
                        {t(titleKey as never)}
                    </CardTitle>
                    <CardDescription>
                        {t(descriptionKey as never)}
                    </CardDescription>
                </CardHeader>
                <Outlet />
            </Card>
        </div>
    );
};

export default AuthLayout;