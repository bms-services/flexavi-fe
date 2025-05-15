import { toastShow } from "@/components/ui/toast/toast-helper";

export default function successHandler(message: string,): void {
    toastShow({
        type: "success",
        description: message,
    });
}