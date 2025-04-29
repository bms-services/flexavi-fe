import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickActions from '@/components/layout/QuickActions';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from '@/components/layout/Sidebar';


const DashboardLayout: React.FC = () => {
    const { token } = useAuth();
    const { t } = useTranslation();
    const isMobile = useIsMobile();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen max-w-full overflow-x-hidden">
            {isMobile ? (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="fixed top-4 left-4 z-50"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 max-w-[200px]">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            ) : (
                <div className="w-[200px] flex-shrink-0 fixed h-screen">
                    <Sidebar />
                </div>
            )}
            <div className={`flex-1 min-h-screen flex flex-col ${!isMobile ? 'ml-[200px]' : ''} max-w-full overflow-x-hidden`}>
                <QuickActions />
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
