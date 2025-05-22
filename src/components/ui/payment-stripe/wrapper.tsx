import { postSettingIntentStore } from "@/actions/settingAction";
import { useAppDispatch } from "@/hooks/use-redux";
import StripeProvider from "@/providers/stripe-provider";
import { useEffect, useState } from "react";
import PaymentStripe from ".";


export default function StripeWrapper() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchIntent = async () => {
            const { payload } = await dispatch(postSettingIntentStore());
            if (payload?.result?.client_secret) {
                setClientSecret(payload.result.client_secret);
            }
        };
        fetchIntent();
    }, [dispatch]);

    if (!clientSecret) return <div>Loading...</div>;

    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentStripe />
        </StripeProvider>
    );
};
