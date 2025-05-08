
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { SubscriptionSettings } from '../subscriptions/SubscriptionSettings';
import { DialogDescription } from '@radix-ui/react-dialog';
interface ReceiptUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function VerifyEmailDialog({
    open,
    onOpenChange,
}: ReceiptUploadDialogProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl overflow-y-auto">

                <SubscriptionSettings />

                <DialogFooter className="">
                    <p className="text-sm text-muted-foreground">
                        To start your trial, please verify your email address. We have sent a verification email to your registered email address. Please check your inbox and click on the verification link to activate your trial.
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
