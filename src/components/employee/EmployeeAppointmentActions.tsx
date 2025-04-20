
import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Calendar, FileText } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";

interface EmployeeAppointmentActionsProps {
  onViewHistory: () => void;
  onOpenRescheduleModal: () => void;
}

export const EmployeeAppointmentActions: React.FC<EmployeeAppointmentActionsProps> = ({
  onViewHistory,
  onOpenRescheduleModal,
}) => (
  <div className="flex gap-2 flex-wrap">
    <Button
      variant="outline"
      size="sm"
      onClick={onViewHistory}
      className="text-xs font-semibold text-[#0A8AD0]"
    >
      <Info className="h-4 w-4 mr-1" />
      Geschiedenis
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={onOpenRescheduleModal}
      className="text-xs font-semibold text-[#0A8AD0]"
    >
      <Calendar className="h-4 w-4 mr-1" />
      Verzetten
    </Button>
    <SheetTrigger asChild>
      <Button
        size="sm"
        className="text-xs font-bold bg-[#0EA5E9] hover:bg-[#0A6DBC] text-white"
      >
        <FileText className="h-4 w-4 mr-1" />
        Verwerken
      </Button>
    </SheetTrigger>
  </div>
);
