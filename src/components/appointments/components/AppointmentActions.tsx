
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NewAppointmentForm } from "./form/NewAppointmentForm";

interface AppointmentActionsProps {
  onNewAppointment: () => void;
  onSettingsOpen: () => void;
  teams: Array<{ id: string; name: string; type: string }>;
}

export const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  onNewAppointment,
  onSettingsOpen,
  teams,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data: any) => {
    onNewAppointment();
    setOpen(false);
    toast({
      title: "Afspraak ingepland",
      description: "De nieuwe afspraak is succesvol ingepland.",
    });
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <>
      <div className="flex gap-2">
        <Button 
          className="bg-primary hover:bg-primary/90" 
          onClick={() => setOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nieuwe Afspraak
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleSettingsClick}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nieuwe Afspraak Inplannen</DialogTitle>
            <DialogDescription>
              Vul het formulier in om een nieuwe afspraak in te plannen.
            </DialogDescription>
          </DialogHeader>
          <NewAppointmentForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};
