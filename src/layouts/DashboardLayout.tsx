import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import LocalizationToggle from "@/components/ui/localization-toggle";
import { useTranslation } from 'react-i18next';


const DashboardLayout: React.FC = () => {
    const { token } = useAuth();
    const { t } = useTranslation();


    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="">
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
