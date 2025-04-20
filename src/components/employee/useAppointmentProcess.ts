
import { useState } from "react";

export const useAppointmentProcess = () => {
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [processReason, setProcessReason] = useState("");
  const [processTaskChecked, setProcessTaskChecked] = useState(false);
  const [processTaskDescription, setProcessTaskDescription] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleOpenProcessModal = () => setProcessModalOpen(true);

  const handleCloseProcessModal = () => {
    setProcessModalOpen(false);
    setProcessReason("");
    setProcessTaskChecked(false);
    setProcessTaskDescription("");
    setProcessing(false);
  };

  const handleProcessSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setProcessModalOpen(false);
      setProcessReason("");
      setProcessTaskChecked(false);
      setProcessTaskDescription("");
    }, 1200);
  };

  return {
    processModalOpen,
    setProcessModalOpen,
    processReason,
    setProcessReason,
    processTaskChecked,
    setProcessTaskChecked,
    processTaskDescription,
    setProcessTaskDescription,
    processing,
    handleOpenProcessModal,
    handleCloseProcessModal,
    handleProcessSubmit,
  };
};
