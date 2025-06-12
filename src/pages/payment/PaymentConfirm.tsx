import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { useUpdateMyPayment } from '@/zustand/hooks/useSetting';

export default function PaymentConfirm() {
    const updateMyPayment = useUpdateMyPayment();
    const [searchParams] = useSearchParams();
    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    useEffect(() => {
        async function fetchPaymentMethod() {
            if (setupIntentId && redirectStatus === 'succeeded') {
                // const { payload } = await dispatch(putSettingPaymentUpdate(setupIntentId));

                // if (payload.result.error) {
                //     setStatus('error');
                // } else {
                //     setStatus('success');
                // }

                const res = await updateMyPayment.mutateAsync({ setup_intent_id: setupIntentId });

                console.log(res.result);

            }
        }

        fetchPaymentMethod();
    }, [setupIntentId, redirectStatus]);

    // const handleTrial = async () => {
    //     const { payload } = await dispatch(postSettingTrialStore());

    //     if (payload.success) {
    //         await dispatch(getProfileShow());

    //         setTimeout(() => {
    //             navigate('/');
    //         }, 1000);
    //     }
    // };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {updateMyPayment.isIdle && (
                <div className="text-center space-y-4">
                    <Progress />
                    <p className="text-gray-700">Verifying payment method...</p>
                </div>
            )}

            {updateMyPayment.isError && (
                <div className="text-center text-red-500">
                    <p>Failed to confirm your payment method. Please try again.</p>
                </div>
            )}

            {updateMyPayment.isSuccess && (
                <div className="text-center space-y-2">
                    <p className="">Your payment method has been successfully confirmed!</p>
                    <p className="">You can now start using your account.</p>
                    {/* <Button
                        onClick={handleTrial}
                        loading={loadingCreateTrial}
                    >
                        Get Trial
                    </Button> */}
                </div>
            )}
        </div>
    );
};
