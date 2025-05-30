import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';

interface ReceiptUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleResendOtp: () => void;
    handleSubmitOtp: (otp: string) => void;
}

export default function VerifyEmailDialog({
    open,
    onOpenChange,
    handleResendOtp,
    handleSubmitOtp,
}: ReceiptUploadDialogProps) {
    const [otp, setOtp] = useState('');

    useEffect(() => {
        console.log('OTP:', otp.length);
        
        if (otp.length === 6) {
            handleSubmitOtp(otp);
        }
    }, [otp, handleSubmitOtp]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Verify Your Email</DialogTitle>
                    <DialogDescription>
                        Please enter the OTP sent to your email address to verify your account.
                        If you did not receive the OTP, please check your spam folder or request a new one.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-6">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                    >
                        <InputOTPGroup>
                            {[...Array(6)].map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <DialogFooter className='!justify-center'>
                    <span>
                        Don't receive the OTP?&nbsp;
                        <span
                            role='button'
                            className="text-blue-600 hover:underline"
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </span>
                    </span>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}