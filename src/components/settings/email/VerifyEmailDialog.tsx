import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useTranslation } from 'react-i18next';

interface ReceiptUploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleResendOtp: () => void;
    handleSubmitOtp: (otp: string) => void;
}

const COUNTDOWN_DURATION = import.meta.env.VITE_COUNTDOWN_DURATION
const OTP_TIMESTAMP_KEY = 'lastOtpSentAt';

export default function VerifyEmailDialog({
    open,
    onOpenChange,
    handleResendOtp,
    handleSubmitOtp,
}: ReceiptUploadDialogProps) {
    const { t } = useTranslation('dashboard');
    const [otp, setOtp] = useState('');
    const [secondsLeft, setSecondsLeft] = useState(0);

    // Check localStorage on mount
    useEffect(() => {
        const lastSent = localStorage.getItem(OTP_TIMESTAMP_KEY);
        if (lastSent) {
            const diff = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
            const remaining = COUNTDOWN_DURATION - diff;
            if (remaining > 0) setSecondsLeft(remaining);
        }
    }, []);

    // Countdown effect
    useEffect(() => {
        if (secondsLeft <= 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    useEffect(() => {
        if (otp.length === 6) {
            handleSubmitOtp(otp);
        }
    }, [otp]);

    const handleResend = () => {
        handleResendOtp();
        localStorage.setItem(OTP_TIMESTAMP_KEY, Date.now().toString());
        setSecondsLeft(COUNTDOWN_DURATION);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('dashboard:banner.otp.title')}</DialogTitle>
                    <DialogDescription>
                        {t('dashboard:banner.otp.description')}
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
                <DialogFooter className="!justify-center">
                    <span className="text-center text-sm text-gray-600">
                        {t("dashboard:banner.otp.dontHaveOtp")}&nbsp;
                        <span
                            role="button"
                            aria-disabled={secondsLeft > 0}
                            className={`inline-block font-medium ${secondsLeft > 0
                                ? 'cursor-default'
                                : 'text-blue-600 hover:underline cursor-pointer'
                                }`}
                            onClick={secondsLeft > 0 ? undefined : handleResend}
                        >
                            {secondsLeft > 0
                                ? new Date(secondsLeft * 1000).toISOString().substring(14, 19) // format mm:ss
                                : t("dashboard:banner.otp.requestNewOtp")}
                        </span>
                    </span>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}