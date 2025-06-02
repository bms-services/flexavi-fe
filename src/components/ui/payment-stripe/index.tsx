import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PaymentStripe = ({ onBack, isFirst }: {
    onBack?: () => void;
    isFirst?: boolean;
}) => {
    const { t } = useTranslation('dashboard');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements || submitted) return;
        setSubmitted(true);

        const { error: submitError } = await elements.submit();

        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            setSubmitted(false);
            return;
        }

        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_APP_URL}/payment/confirm`,
            },
            // redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
            setSubmitted(false);
        }
        // else if (setupIntent && setupIntent.status === 'succeeded') {
        //     navigate('/payment/confirm');
        // } 
        else {
            setErrorMessage(null);
            setSubmitted(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <div className='flex items-center justify-between'>
                {onBack && (
                    <Button
                        variant="outline"
                        type="button"
                        onClick={onBack}
                    >
                        Back
                    </Button>
                )}
                <Button
                    type="submit"
                    loading={!stripe || !elements}
                >
                    {isFirst ? t('dashboard:banner.paymentMethod.cta') : t('dashboard:settings.payment.cta')}
                </Button>
            </div>
        </form>
    );
};

export default PaymentStripe;
