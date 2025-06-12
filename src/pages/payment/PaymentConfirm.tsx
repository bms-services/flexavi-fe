import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCreateMyTrial, useUpdateMyPayment } from '@/zustand/hooks/useSetting';
import { useGlobalStore } from '@/zustand/stores/loaderStore';
import VectorPaymentMethodSuccess from "@/assets/images/vector/payment-method-success.jpg";

export default function PaymentConfirm() {
    const updateMyPaymentZ = useUpdateMyPayment();
    const createMyTrialZ = useCreateMyTrial();
    const { setLoader } = useGlobalStore();
    const [searchParams] = useSearchParams();

    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    useEffect(() => {
        const handleUpdatePayment = async () => {
            if (!setupIntentId || redirectStatus !== 'succeeded') return;

            try {
                setLoader(true, "Verifying your payment method...");
                const res = await updateMyPaymentZ.mutateAsync({ setup_intent_id: setupIntentId });

                if (res.success) {
                    await createMyTrialZ.mutateAsync();
                }
            } catch (error) {
                console.error("Error during payment confirm:", error);
            } finally {
                setLoader(false);
            }
        };

        handleUpdatePayment();
    }, [setupIntentId, redirectStatus, setLoader]);

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
                        <p>You can now start using your account.</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}