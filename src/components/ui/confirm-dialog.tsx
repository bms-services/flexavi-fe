// components/ui/confirm-dialog.tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
    open,
    title = "Are you sure?",
    description,
    onCancel,
    onConfirm,
    isConfirm = false,
    loading = false
}: {
    open: boolean;
    title?: string;
    description?: string;
    onCancel: () => void;
    onConfirm: () => void;
    isConfirm?: boolean;
    loading?: boolean;
}) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-[375px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button
                        loading={loading}
                        variant={
                            isConfirm ? "default" : "destructive"
                        }
                        onClick={onConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
