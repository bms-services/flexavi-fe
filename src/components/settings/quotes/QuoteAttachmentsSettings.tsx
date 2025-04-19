
import React, { useState } from "react";
import { DefaultAttachmentsPanel } from "../shared/DefaultAttachmentsPanel";

export const QuoteAttachmentsSettings = () => {
  const [attachments, setAttachments] = useState([
    { id: '1', name: 'Voorwaarden.pdf', url: '/attachments/terms.pdf' },
  ]);

  return (
    <DefaultAttachmentsPanel
      title="Standaard bijlages offertes"
      description="Beheer de standaard bijlages die worden toegevoegd aan nieuwe offertes"
      attachments={attachments}
      onAttachmentsChange={setAttachments}
    />
  );
};
