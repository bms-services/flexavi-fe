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
import { useAppDispatch } from "@/hooks/use-redux";
import { getProfileShow, putVerifyEmail, postResendEmailVerification } from '@/actions/profileAction';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { User } from '@/types/user';
import VerifyEmailDialog from '@/components/settings/email/VerifyEmailDialog';
import SubscriptionTrialActivateDialog from '@/components/settings/subscriptions/dialogs/SubscriptionTrialActivateDialog';
import PaymentMethodCardDialog from '@/components/settings/payments/dialogs/PaymentMethodCardDialog';


const DashboardLayout: React.FC = () => {
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile();

    const { token } = useAuth();    
    const { t } = useTranslation('dashboard');

    const [modal, setModal] = useState({
        subscription: false,
        paymentMethod: false,
        verifyEmail: false,
    });

    const profileShowRedux = useSelector((state: RootState) => state.profile.show);
    const { result } = profileShowRedux;

    useEffect(() => {
        dispatch(getProfileShow());
    }, [dispatch]);


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

    const handleSubmitOtp = (otp: string) => {
        dispatch(putVerifyEmail(otp))
            .unwrap()
            .then(() => {
                dispatch(getProfileShow());

                setTimeout(() => {
                    setModal((modal) => ({ ...modal, verifyEmail: false }));
                }, 1000);
            })
            .catch((error) => {
                console.error('Failed to verify email:', error);
            });
    }

    const handleResendOtp = () => {
        dispatch(postResendEmailVerification());
    }

    // Redirect to login if token is not available
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to create company if user does not have a main company
    if (!result?.has_main_company) {
        return <Navigate to="/create-company" replace />;
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
                {result?.has_verified_email === false && (
                    <div className="flex items-center gap-[14px] bg-orange-400 px-4 md:px-6 py-2">
                        <MailOpenIcon className="h-6 w-6 text-white" />
                        <div className='flex flex-col'>
                            <h6 className="text-[14px] font-medium text-white">
                                {t('dashboard:banner.emailNotVerified.title')}
                            </h6>
                            <div className='flex items-center gap-1'>
                                <span className="text-[12px] font-normal text-white">
                                    {t("dashboard:banner.emailNotVerified.description")}&nbsp;
                                </span>
                                <span onClick={handleOpenVerifyEmail} className="text-[12px] font-normal text-white cursor-pointer hover:underline">
                                    {t("dashboard:banner.emailNotVerified.cta")}
                                </span>
                            </div>
                        </div>
                        <VerifyEmailDialog 
                        open={modal.verifyEmail} 
                        onOpenChange={() => setModal((modal) => ({ ...modal, subscription: false }))} 
                        handleResendOtp={handleResendOtp}
                        handleSubmitOtp={handleSubmitOtp}
                        />
                    </div>
                )}

                {result?.has_payment_method === false && (
                    <div className="flex items-center gap-[14px] bg-indigo-400 px-4 md:px-6 py-2">
                        <CreditCardIcon className="h-6 w-6 text-white" />
                        <div className='flex flex-col'>
                            <h6 className="text-[14px] font-medium text-white">
                                {t('dashboard:banner.paymentMethod.title')}
                            </h6>
                            <div className='flex items-center gap-1'>
                                <span className="text-[12px] font-normal text-white">
                                    {t("dashboard:banner.paymentMethod.description")}&nbsp;
                                </span>
                                <span onClick={handleOpenSubscription} className="text-[12px] font-normal text-white cursor-pointer hover:underline">
                                    {t("dashboard:banner.paymentMethod.cta")}
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
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
