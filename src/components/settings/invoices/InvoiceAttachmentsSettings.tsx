
import React, { useState } from "react";
import { DefaultAttachmentsPanel } from "../shared/DefaultAttachmentsPanel";

export const InvoiceAttachmentsSettings = () => {
  const [attachments, setAttachments] = useState([
    { id: '1', name: 'Factuurvoorwaarden.pdf', url: '/attachments/invoice-terms.pdf' },
  ]);

  return (
    <DefaultAttachmentsPanel
      title="Standaard bijlages facturen"
      description="Beheer de standaard bijlages die worden toegevoegd aan nieuwe facturen"
      attachments={attachments}
      onAttachmentsChange={setAttachments}
    />
  );
};
