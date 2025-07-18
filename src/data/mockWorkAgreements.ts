
import { WorkAgreement } from "@/types";

export const mockWorkAgreements: WorkAgreement[] = [
  {
    id: "wa-1",
    quoteId: "quote-2",
    leadId: "2",
    totalAmount: 2800.50,
    description: "Installatie van zonnepanelen inclusief omvormer",
    status: "signed",
    workDescription: "Installatie van 12 zonnepanelen op het zuidelijke dak inclusief montage en aansluiting op het elektriciteitsnet.",
    warranty: "10",
    startDate: "2025-05-10T09:00:00Z",
    companySignature: "data:image/png;base64,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",
    customerSignature: "data:image/png;base64,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",
    createdAt: "2025-04-18T12:30:45Z",
    updatedAt: "2025-04-18T14:25:15Z",
    lineItems: [
      {
        id: "item-6",
        description: "12 x Zonnepaneel Jinko Solar 415 Wp",
        quantity: 12,
        unit: "stuks",
        pricePerUnit: 250.00,
        total: 3000.00
      },
      {
        id: "item-7",
        description: "Omvormer Growatt 3000W",
        quantity: 1,
        unit: "stuk",
        pricePerUnit: 850.00,
        total: 850.00
      },
      {
        id: "item-8",
        description: "Montagemateriaal schuin dak",
        quantity: 1,
        unit: "set",
        pricePerUnit: 325.00,
        total: 325.00
      },
      {
        id: "item-9",
        description: "Bekabeling en aansluitmateriaal",
        quantity: 1,
        unit: "set",
        pricePerUnit: 150.00,
        total: 150.00
      },
      {
        id: "item-10",
        description: "Installatie en aansluiten",
        quantity: 8,
        unit: "uur",
        pricePerUnit: 65.00,
        total: 520.00
      }
    ],
    exclusions: [
      "Werkzaamheden die niet genoemd zijn vallen buiten deze werkovereenkomst",
      "Werkzaamheden aan asbesthoudende materialen",
      "Werkzaamheden anders dan omschreven",
      "Parkeerkosten"
    ],
    defaultAttachments: [
      { 
        name: "Algemene Voorwaarden.pdf", 
        url: "https://example.com/attachments/algemene-voorwaarden.pdf" 
      },
      { 
        name: "Project Schema.pdf", 
        url: "https://example.com/attachments/project-schema.pdf" 
      },
      { 
        name: "Dakfoto.jpg", 
        url: "https://images.unsplash.com/photo-1581280485037-8c16713f3a24?w=800&auto=format&fit=crop" 
      },
      { 
        name: "Installatie Voorbeeld.jpg", 
        url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop" 
      }
    ]
  }
];
