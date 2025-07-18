// components/Stripe/StripeProvider.tsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

type StripeProviderProps = {
    clientSecret: string;
    children: ReactNode;
};

const StripeProvider = ({ clientSecret, children }: StripeProviderProps) => {
    return (
        <Elements stripe={stripePromise} options={{
            clientSecret,
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#000',
                    colorBackground: '#fff',
                    colorText: '#000',
                    fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
                    fontSizeBase: '16px',
                    spacingUnit: '2px',
                },
                rules: {
                    '.Input': {
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        padding: '10px',
                    },
                    '.Label': {
                        color: '#333',
                        fontSize: '14px',
                    },
                },
            }
        }}>
            {children}
        </Elements>
    );

};

export default StripeProvider;
