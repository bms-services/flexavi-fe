import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../button';
import { useTranslation } from 'react-i18next';

const PaymentStripe = ({ onBack }: {
    onBack?: () => void;
}) => {
    const { t } = useTranslation('dashboard');
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            return;
        }

        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: import.meta.env.VITE_APP_URL + '/payment/confirm',
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
