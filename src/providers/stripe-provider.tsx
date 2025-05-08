// components/Stripe/StripeProvider.tsx
import { createProfileIntent } from '@/actions/profileAction';
import { useAppDispatch } from '@/hooks/use-redux';
import { RootState } from '@/store';
import { User } from '@/types/user';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, SetupIntent, StripeElementsOptionsClientSecret } from '@stripe/stripe-js';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

type StripeProviderProps = {
    clientSecret: string;
    children: ReactNode;
};

const StripeProvider = ({ clientSecret, children }: StripeProviderProps) => {
    return (
        <Elements stripe={stripePromise} options={{
            // amount: 0,
            // mode: 'subscription',
            // currency: 'eur',
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
