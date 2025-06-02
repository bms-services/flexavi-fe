import { postSettingIntentStore } from "@/actions/settingAction";
import { useAppDispatch } from "@/hooks/use-redux";
import StripeProvider from "@/providers/stripe-provider";
import { useEffect, useState } from "react";
import PaymentStripe from ".";


export default function StripeWrapper({ isFirst = false }: { isFirst?: boolean }) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchIntent = async () => {
            const { payload } = await dispatch(postSettingIntentStore());
            const data = payload as { result?: { client_secret?: string } };
            if (data?.result?.client_secret) {
                setClientSecret(data.result.client_secret);
            }
        };
        fetchIntent();
    }, [dispatch]);

    if (!clientSecret) return null;

    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentStripe isFirst={isFirst} />
        </StripeProvider>
    );
};
