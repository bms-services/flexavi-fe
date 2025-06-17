import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateMyTrial, useUpdateMyPayment } from '@/zustand/hooks/useSetting';
import { useGlobalStore } from '@/zustand/stores/loaderStore';
import VectorPaymentMethodSuccess from "@/assets/images/vector/payment-method-success.jpg";
import { useShowMyProfile } from '@/zustand/hooks/useProfile';
import { Button } from '@/components/ui/button';

export default function PaymentConfirm() {
    const { setLoader } = useGlobalStore();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateMyPaymentZ = useUpdateMyPayment();
    const createMyTrialZ = useCreateMyTrial();
    const showMyProfileZ = useShowMyProfile();

    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    useEffect(() => {
        const handleUpdatePayment = async () => {
            if (!setupIntentId || redirectStatus !== 'succeeded') return;

            try {
                setLoader(true, "Verifying your payment method...");

                // Step 1: Pastikan data profil sudah ter-load
                if (showMyProfileZ.isLoading || !showMyProfileZ.data) {
                    setLoader(true, "Loading your profile data...");
                    await showMyProfileZ.refetch();
                }

                // Step 2: Update payment method
                setLoader(true, "Updating your payment method...");
                const res = await updateMyPaymentZ.mutateAsync({ setup_intent_id: setupIntentId });

                if (res.success) {
                    // Step 3: Refresh profile data untuk mendapatkan status terbaru
                    setLoader(true, "Refreshing profile data...");
                    const profileResult = await showMyProfileZ.refetch();

                    // Step 4: Pastikan data ada dan check status subscription
                    const statusSubscription = profileResult.data?.result?.status_subscription;
                    console.log("Current subscription status:", statusSubscription);

                    if (statusSubscription !== null) {
                        console.log("User already has subscription, skipping trial creation");
                        return;
                    }

                    // Step 5: Buat trial untuk user baru
                    setLoader(true, "Setting up your trial subscription...");
                    await createMyTrialZ.mutateAsync();
                }
            } catch (error) {
                console.error("Error during payment confirm:", error);
            } finally {
                setLoader(false);
            }
        };

        handleUpdatePayment();
    }, [setupIntentId, redirectStatus]);

    if (!setupIntentId || redirectStatus !== 'succeeded') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-center">Invalid payment confirmation. Please try again.</p>
            </div>
        );
    }

    if (updateMyPaymentZ.isSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-4">
                    <img
                        src={VectorPaymentMethodSuccess}
                        alt="Payment Method Success"
                        className="w-96 h-auto mx-auto mb-4"
                    />
                    <div className="text-center space-y-1">
                        <p>Your payment method has been successfully confirmed!</p>
                        <Button onClick={() => navigate('/')}>
                            Go to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}