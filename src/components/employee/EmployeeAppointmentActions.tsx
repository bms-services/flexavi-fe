
import React from "react";
import { Button } from "@/components/ui/button";
import { History, RotateCcw } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface EmployeeAppointmentActionsProps {
  onViewHistory: () => void;
  onOpenRescheduleModal: () => void;
}

export const EmployeeAppointmentActions: React.FC<EmployeeAppointmentActionsProps> = ({
  onViewHistory,
  onOpenRescheduleModal,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onViewHistory}
        className="text-[#0ea5e9] border-[#0ea5e9]"
      >
        <History className="h-4 w-4 mr-1" />
        Geschiedenis
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenRescheduleModal}
            className="text-amber-500 border-amber-500"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Verzetten
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};
