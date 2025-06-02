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
    const [trialActivated, setTrialActivated] = useState(false);
    const [autoTrialAttempted, setAutoTrialAttempted] = useState(false);

    const setupIntentId = searchParams.get('setup_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const { loading: loadingCreateTrial } = useSelector((state: RootState) => state.setting.trial.store);
    const trialErrors = useSelector((state: RootState) => state.setting.trial.store.errors);
    const profile = useSelector((state: RootState) => state.profile.show.result);

    // Determine eligibility for trial: no active subscription, not on trial, and (optionally) just added first payment method
    const eligibleForTrial = profile && !profile.has_active_subscription && !profile.is_on_trial;

    useEffect(() => {
        async function fetchPaymentMethod() {
            if (setupIntentId && redirectStatus === 'succeeded') {
                const actionResult = await dispatch(putSettingPaymentUpdate(setupIntentId));
                const payload = actionResult.payload as { result?: { error?: string } };
                if (payload?.result?.error) {
                    setStatus('error');
                    navigate('/')
                } else {
                    setStatus('success');
                    // If eligible for trial and haven't tried auto-activation yet, do it
                    if (eligibleForTrial && !autoTrialAttempted) {
                        setAutoTrialAttempted(true);
                        const trialResult = await dispatch(postSettingTrialStore());
                        const trialPayload = trialResult.payload as { success?: boolean };
                        if (trialPayload?.success) {
                            setTrialActivated(true);
                            await dispatch(getProfileShow());
                            setTimeout(() => {
                                navigate('/');
                            }, 1000);
                        }
                    }
                }
            }
            setLoading(false);
        }
        fetchPaymentMethod();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, setupIntentId, redirectStatus, eligibleForTrial]);

    const handleTrial = async () => {
        const actionResult = await dispatch(postSettingTrialStore());
        const payload = actionResult.payload as { success?: boolean };
        if (payload?.success) {
            await dispatch(getProfileShow());
            setTrialActivated(true);
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
                    {/* If trial was just activated automatically, show message */}
                    {trialActivated && (
                        <p>Your free trial has started!</p>
                    )}
                    {/* If eligible for trial and not auto-activated (e.g. not onboarding), show button */}
                    {eligibleForTrial && !autoTrialAttempted && !trialActivated && (
                        <Button
                            onClick={handleTrial}
                            loading={loadingCreateTrial}
                        >
                            Get Trial
                        </Button>
                    )}
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
