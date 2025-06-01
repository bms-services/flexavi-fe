import {
    Dialog,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { SubscriptionSettings } from '../SubscriptionSettings';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

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
    const { errors, loading } = useSelector((state: RootState) => state.setting.trial.store);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl overflow-y-auto">
                <SubscriptionSettings />
                <DialogFooter className="space-y-12 mt-3">
                    {errors && errors.length > 0 && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.map((err, idx) => <div key={idx}>{err}</div>)}
                        </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                        To start your trial, choose a plan and add your payment method. You will not be charged until the trial period ends.
                    </p>
                    <Button className="" onClick={onNext} loading={loading}>
                        Next
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
