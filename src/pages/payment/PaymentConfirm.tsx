import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // atau useRouter di Next.js
import { Progress } from '@/components/ui/progress';
import { createProfileTrial, getProfile, updateProfilePayment } from '@/actions/profileAction';
import { useAppDispatch } from '@/hooks/use-redux';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';

export default function PaymentConfirm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const { loading: loadingCreateTrial } = useSelector((state: RootState) => state.profile.createTrial);

    useEffect(() => {
        async function fetchPaymentMethod() {
            if (setupIntentId && redirectStatus === 'succeeded') {
                const { payload } = await dispatch(updateProfilePayment(setupIntentId));

                if (payload.result.error) {
                    setStatus('error');
                    toast.error(payload.result.error.message);

                } else {
                    setStatus('success');       
                    toast.success("Success save payment method");
                }
            }
            setLoading(false);
        }

        fetchPaymentMethod();
    }, [dispatch, setupIntentId, redirectStatus]);

    const handleTrial = async () => {
        const { payload } = await dispatch(createProfileTrial());

        if (payload.success) {
            await dispatch(getProfile());

            toast.success("Success activate trial");

            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {loading && (
                <div className="text-center space-y-4">
                    <Progress />
                    <p className="text-gray-700">Verifying payment method...</p>
                </div>
            )}

            {!loading && status === 'error' && (
                <div className="text-center text-red-500">
                    <p>Failed to confirm your payment method. Please try again.</p>
                </div>
            )}

            {!loading && status === 'success' && (
                <div className="text-center text-green-500 space-y-2">
                    <p>Payment method confirmed successfully!</p>
                    <Button
                        onClick={handleTrial}
                        loading={loadingCreateTrial}
                    >
                        Get Trial
                    </Button>
                </div>
            )}
        </div>
    );
};
