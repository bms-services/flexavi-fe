
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog';
import { SubscriptionSettings } from '../../subscriptions/SubscriptionSettings';
import StripeProvider from '@/providers/stripe-provider';
import PaymentStripe from '@/components/ui/payment-stripe';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import StripeWrapper from '@/components/ui/payment-stripe/wrapper';
interface PaymentMethodCardDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack: () => void;
}

export default function PaymentMethodCardDialog({
    open,
    onOpenChange,
    onBack,
}: PaymentMethodCardDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Payment Method
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Add your payment method to start your trial. You will not be charged until the trial period ends.
                    </DialogDescription>
                </DialogHeader>
                {/* <StripeProvider>
                    <PaymentStripe onBack={onBack} />
                </StripeProvider> */}

                <StripeWrapper />
            </DialogContent>
        </Dialog>
    );
};
