import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../button';
import { useTranslation } from 'react-i18next';
import { createProfileIntent } from '@/actions/profileAction';
import { useAppDispatch } from '@/hooks/use-redux';

const PaymentStripe = ({ onBack }: {
    onBack?: () => void;
}) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('dashboard');
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();

        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }

        // const { payload } = await dispatch(createProfileIntent());

        const { error } = await stripe.confirmSetup({
            elements,
            // clientSecret: payload.result.client_secret,
            confirmParams: {
                // return_url: import.meta.env.VITE_APP_URL + 'payment/confirm',
                return_url: "https://stripe.com/payment/confirm"
            },
            redirect: 'always',
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage(null);
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
                    {t('dashboard:settings.payment.cta')}
                </Button>
            </div>
        </form>
    );
};

export default PaymentStripe;
