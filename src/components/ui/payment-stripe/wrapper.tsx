import StripeProvider from "@/providers/stripe-provider";
import { useEffect, useState } from "react";
import PaymentStripe from ".";
import { useCreateMyIntent } from "@/zustand/hooks/useSetting";


export default function StripeWrapper() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const createMyIntentZ = useCreateMyIntent()

    useEffect(() => {
        const fetchIntent = async () => {
            createMyIntentZ.mutateAsync()
                .then((data) => {
                    const { result } = data;
                    if (result.client_secret) {
                        setClientSecret(result.client_secret);
                    }
                })
        };
        fetchIntent();
    }, []);

    if (!clientSecret) return <div>Loading...</div>;

    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentStripe />
        </StripeProvider>
    );
};
