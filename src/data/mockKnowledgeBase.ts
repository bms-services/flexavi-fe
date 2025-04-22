
import { KnowledgeBaseEntry, KnowledgeBaseCategory } from "@/types/knowledge-base";
import { v4 as uuidv4 } from "uuid";

export const mockKnowledgeBaseCategories: KnowledgeBaseCategory[] = [
  {
    id: "cat-1",
    name: "Algemeen",
    description: "Algemene vragen over ons platform"
  },
  {
    id: "cat-2",
    name: "Offertes",
    description: "Vragen over het maken en versturen van offertes"
  },
  {
    id: "cat-3",
    name: "Facturatie",
    description: "Vragen over facturen en betalingen"
  },
  {
    id: "cat-4",
    name: "Projecten",
    description: "Vragen over projectbeheer"
  }
];

export const mockKnowledgeBaseEntries: KnowledgeBaseEntry[] = [
  {
    id: "kb-1",
    question: "Hoe maak ik een nieuwe offerte aan?",
    answer: "U kunt een nieuwe offerte aanmaken door naar het menu 'Offertes' te gaan en vervolgens op de knop 'Nieuwe offerte' te klikken. Vul daarna alle vereiste velden in en klik op 'Opslaan'.",
    type: "text",
    categoryId: "cat-2",
    createdAt: new Date(2025, 1, 15).toISOString(),
    updatedAt: new Date(2025, 1, 15).toISOString(),
    published: true
  },
  {
    id: "kb-2",
    question: "Hoe kan ik mijn facturen exporteren naar mijn boekhoudpakket?",
    answer: "U kunt uw facturen exporteren naar uw boekhoudpakket door naar 'Facturen' te gaan, de gewenste facturen te selecteren en vervolgens op 'Exporteren' te klikken. Kies daarna het gewenste formaat voor uw boekhoudpakket.",
    type: "text",
    categoryId: "cat-3",
    createdAt: new Date(2025, 2, 10).toISOString(),
    updatedAt: new Date(2025, 2, 10).toISOString(),
    published: true
  },
  {
    id: "kb-3",
    question: "Hoe werkt de projectplanning?",
    answer: "In onze projectplanning kunt u eenvoudig taken toewijzen aan teamleden en deadlines instellen. Bekijk de video voor een gedetailleerde uitleg.",
    type: "video",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    categoryId: "cat-4",
    createdAt: new Date(2025, 3, 5).toISOString(),
    updatedAt: new Date(2025, 3, 5).toISOString(),
    published: true
  },
  {
    id: "kb-4",
    question: "Waar vind ik een overzicht van mijn klanten?",
    answer: "U vindt een overzicht van al uw klanten in het menu 'Leads'. Hier kunt u uw klantenbestand beheren, nieuwe klanten toevoegen en bestaande klantgegevens wijzigen.",
    type: "image",
    mediaUrl: "/placeholder.svg",
    categoryId: "cat-1",
    createdAt: new Date(2025, 2, 20).toISOString(),
    updatedAt: new Date(2025, 2, 20).toISOString(),
    published: true
  },
  {
    id: "kb-5",
    question: "Hoe kan ik een nieuw team aanmaken?",
    answer: "Teams kunnen worden aangemaakt in de instellingen onder het kopje 'Teams'. Klik op 'Nieuw team' en voeg vervolgens teamleden toe door hun e-mailadressen in te voeren.",
    type: "text",
    categoryId: "cat-1",
    createdAt: new Date(2025, 3, 15).toISOString(),
    updatedAt: new Date(2025, 3, 15).toISOString(),
    published: false
  }
];
