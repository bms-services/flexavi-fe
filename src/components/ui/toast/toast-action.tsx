import { ReactNode, useState } from "react";
import { ArchiveIcon, ChevronDownIcon, TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ConfirmDialog } from "../confirm-dialog";

export function ToastActionContent({
  title,
  description,
  suffix,
  onDelete,
  onArchive,
  onDismiss,
  loading = false,
}: {
  title?: string;
  description?: string;
  suffix?: ReactNode;
  onDismiss?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  loading?: boolean;
}) {
  const [confirming, setConfirming] = useState<"delete" | "archive" | null>(null);

  const handleConfirm = () => {
    if (confirming === "delete" && onDelete) onDelete();
    if (confirming === "archive" && onArchive) onArchive();
    setConfirming(null);
  };

  return (
    <>
      <div className="py-[8px] px-[8px] flex justify-between items-center gap-10 min-w-[80px]">
        {suffix && <div>{suffix}</div>}
        <div className="flex items-center gap-2">

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onDismiss}
                  className="p-0 bg-transparent text-white hover:text-yellow-500 transition-colors duration-200 ease-in-out"
                >
                  <ChevronDownIcon className="w-5 h-5 " />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Close
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-col gap-1 text-white">
            {title && <p className="font-medium text-sm">{title}</p>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          {onDelete && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setConfirming("delete")}
                    className="p-0 bg-transparent text-white hover:text-red-500 transition-colors duration-200 ease-in-out"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Delete
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {onArchive && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    // onClick={onArchive}
                    onClick={() => setConfirming("archive")}
                    className="p-0 bg-transparent text-white hover:text-yellow-500 transition-colors duration-200 ease-in-out"
                  >
                    <ArchiveIcon className="w-5 h-5 " />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Archive
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirming}
        onCancel={() => setConfirming(null)}
        onConfirm={handleConfirm}
        title={`Confirm ${confirming === "delete" ? "deletion" : "archiving"}?`}
        description={`Are you sure you want to ${confirming} the selected item(s)? This action cannot be undone.`}
        loading={loading}
        isConfirm={confirming === "archive"}
      />
    </>
  );
}
