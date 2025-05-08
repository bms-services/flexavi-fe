
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { SubscriptionSettings } from '../SubscriptionSettings';
import { Button } from '@/components/ui/button';
interface SubscriptionTrialActivateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onNext: () => void;
}

export default function SubscriptionTrialActivateDialog({
    open,
    onOpenChange,
    onNext,
}: SubscriptionTrialActivateDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl overflow-y-auto">
                <SubscriptionSettings />
                <DialogFooter className="space-y-12">
                    <p className="text-sm text-muted-foreground">
                        To start your trial, choose a plan and add your payment method. You will not be charged until the trial period ends.
                    </p>

                    <Button className="" onClick={onNext}>
                        Next
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
