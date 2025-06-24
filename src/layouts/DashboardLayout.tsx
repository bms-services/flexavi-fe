import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickActions from '@/components/layout/QuickActions';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreditCardIcon, MailOpenIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from '@/components/layout/Sidebar';
import VerifyEmailDialog from '@/components/settings/email/VerifyEmailDialog';
import SubscriptionTrialActivateDialog from '@/components/settings/subscriptions/dialogs/SubscriptionTrialActivateDialog';
import PaymentMethodCardDialog from '@/components/settings/payments/dialogs/PaymentMethodCardDialog';
import Loader from '@/components/ui/loader';
import { useRequestEmailVerificationMyProfile, useShowMyProfile, useVerifyEmailMyProfile } from '@/zustand/hooks/useProfile';
import { useGlobalStore } from '@/zustand/stores/loaderStore';
import { usePageTitle } from '@/hooks/usePageTitle';

const DashboardLayout: React.FC = () => {
    usePageTitle();

    const { token } = useAuth();
    const { t } = useTranslation('dashboard');
    const { setLoader } = useGlobalStore();

    const showMyProfileZ = useShowMyProfile();
    const requestEmailVerificationMyProfileZ = useRequestEmailVerificationMyProfile();
    const verifyEmailMyProfileZ = useVerifyEmailMyProfile();
    const isMobile = useIsMobile();

    const [modal, setModal] = useState({
        subscription: false,
        paymentMethod: false,
        verifyEmail: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoader(true, "Loading your dashboard...");
                await showMyProfileZ.refetch();
            } catch (error) {
                setLoader(false);
            } finally {
                setLoader(false);
            }
        };

        fetchProfile();
    }, [setLoader]);

    const handleOpenVerifyEmail = () => {
        setModal((modal) => ({
            ...modal,
            verifyEmail: true,
        }));
    }

    const handleOpenSubscription = () => {
        setModal((modal) => ({
            ...modal,
            paymentMethod: false,
            subscription: true,
        }));
    }

    const handleOpenPaymentMethod = () => {
        setModal((modal) => ({
            ...modal,
            subscription: false,
            paymentMethod: true,
        }));
    }

    const handleSubmitOtp = async (otp: string) => {
        try {
            await verifyEmailMyProfileZ.mutateAsync(otp);
            await showMyProfileZ.refetch();
            setTimeout(() => {
                setModal((modal) => ({ ...modal, verifyEmail: false }));
            }, 1000);
        } catch (error) {
            throw new Error("Failed to verify email");
        }
    }

    const handleResendOtp = () => {
        requestEmailVerificationMyProfileZ.mutateAsync()
    }

    // Redirect to login if token is not available
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
                {showMyProfileZ.data?.result.has_verified_email === false && (
                    <div className="flex items-center gap-[14px] bg-orange-400 px-4 md:px-6 py-2">
                        <MailOpenIcon className="h-6 w-6 text-white" />
                        <div className='flex flex-col'>
                            <h6 className="text-[14px] font-medium text-white">
                                {t('banner.emailNotVerified.title')}
                            </h6>
                            <div className='flex items-center gap-1'>
                                <span className="text-[12px] font-normal text-white">
                                    {t("banner.emailNotVerified.description")}
                                </span>
                                <span onClick={handleOpenVerifyEmail} className="text-[12px] font-normal text-white cursor-pointer hover:underline">
                                    {t("banner.emailNotVerified.cta")}
                                </span>
                            </div>
                        </div>
                        <VerifyEmailDialog
                            open={modal.verifyEmail}
                            onOpenChange={() => setModal((modal) => ({ ...modal, verifyEmail: false }))}
                            handleResendOtp={handleResendOtp}
                            handleSubmitOtp={handleSubmitOtp}
                        />
                    </div>
                )}

                {showMyProfileZ.data?.result?.has_payment_method === false && (
                    <div className="flex items-center gap-[14px] bg-indigo-400 px-4 md:px-6 py-2">
                        <CreditCardIcon className="h-6 w-6 text-white" />
                        <div className='flex flex-col'>
                            <h6 className="text-[14px] font-medium text-white">
                                {t('banner.paymentMethod.title')}
                            </h6>
                            <div className='flex items-center gap-1'>
                                <span className="text-[12px] font-normal text-white">
                                    {t("banner.paymentMethod.description")}
                                </span>
                                <span onClick={handleOpenSubscription} className="text-[12px] font-normal text-white cursor-pointer hover:underline">
                                    {t("banner.paymentMethod.cta")}
                                </span>
                            </div>
                        </div>
                        <SubscriptionTrialActivateDialog open={modal.subscription} onOpenChange={() => setModal((modal) => ({ ...modal, subscription: false }))} onNext={handleOpenPaymentMethod} />
                        <PaymentMethodCardDialog open={modal.paymentMethod} onOpenChange={() => setModal((modal) => ({ ...modal, paymentMethod: false }))} onBack={handleOpenSubscription} />
                    </div>
                )}

                <QuickActions />
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div>
                    </div>
                    <Outlet />
                    <Loader />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
