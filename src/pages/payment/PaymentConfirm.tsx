import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { postSettingTrialStore, putSettingPaymentUpdate } from '@/actions/settingAction';
import { useAppDispatch } from '@/hooks/use-redux';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getProfileShow } from '@/actions/profileAction';

export default function PaymentConfirm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);

    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const { loading: loadingCreateTrial } = useSelector((state: RootState) => state.setting.trial.store);
    const trialErrors = useSelector((state: RootState) => state.setting.trial.store.errors);

    useEffect(() => {
        async function fetchPaymentMethod() {
            if (setupIntentId && redirectStatus === 'succeeded') {
                const actionResult = await dispatch(putSettingPaymentUpdate(setupIntentId));
                const payload = actionResult.payload as { result?: { error?: string } };
                if (payload?.result?.error) {
                    setStatus('error');
                } else {
                    setStatus('success');
                }
            }
            setLoading(false);
        }

        fetchPaymentMethod();
    }, [dispatch, setupIntentId, redirectStatus]);

    const handleTrial = async () => {
        const actionResult = await dispatch(postSettingTrialStore());
        const payload = actionResult.payload as { success?: boolean };
        if (payload?.success) {
            await dispatch(getProfileShow());

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
                    {/* Show trial error if any */}
                    {trialErrors && trialErrors.length > 0 && (
                        <div className="text-red-500 text-sm mt-2">
                            {trialErrors.map((err, idx) => <div key={idx}>{err}</div>)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
