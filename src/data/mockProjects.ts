
import { Project, ProjectStatus } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Renovatie appartementencomplex Zuidwijk",
    description: "Volledige renovatie van 12 appartementen in Zuidwijk, Rotterdam",
    status: "active",
    startDate: "2025-03-15",
    location: "Zuidwijk, Rotterdam",
    budget: 120000,
    expenses: [
      {
        id: "exp-1",
        projectId: "proj-1",
        description: "Materiaalkosten hout en isolatie",
        amount: 15000,
        date: "2025-03-20",
        receiptUrl: "/receipts/exp-1.pdf",
        createdAt: "2025-03-20T14:00:00Z",
        updatedAt: "2025-03-20T14:00:00Z",
      },
      {
        id: "exp-2",
        projectId: "proj-1",
        description: "Huur steiger equipment",
        amount: 3500,
        date: "2025-03-25",
        receiptUrl: "/receipts/exp-2.pdf",
        createdAt: "2025-03-25T10:00:00Z",
        updatedAt: "2025-03-25T10:00:00Z",
      }
    ],
    personnel: [
      {
        id: "pers-1",
        projectId: "proj-1",
        name: "Jan Timmerman",
        role: "Voorman",
        dailyRate: 350,
        days: 25,
        totalCost: 8750,
      },
      {
        id: "pers-2",
        projectId: "proj-1",
        name: "Pieter de Vries",
        role: "Timmerman",
        dailyRate: 300,
        days: 25,
        totalCost: 7500,
      }
    ],
    leads: ["1", "5"],
    quotes: ["quote-1", "quote-5"],
    invoices: ["inv-1"],
    workAgreements: ["wa-1"],
    revenue: 145000,
    profit: 25000,
    photos: [
      { name: "Foto 1", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { name: "Foto 2", url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-04-15T16:30:00Z",
  },
  {
    id: "proj-2",
    name: "Dakrenovatie en zonnepanelen Wilgenbuurt",
    description: "Dakrenovatie en plaatsing van 40 zonnepanelen voor woningcorporatie",
    status: "completed",
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    location: "Wilgenbuurt, Amsterdam",
    budget: 85000,
    expenses: [
      {
        id: "exp-3",
        projectId: "proj-2",
        description: "Zonnepanelen (40 stuks)",
        amount: 24000,
        date: "2025-02-05",
        receiptUrl: "/receipts/exp-3.pdf",
        createdAt: "2025-02-05T11:30:00Z",
        updatedAt: "2025-02-05T11:30:00Z",
      },
      {
        id: "exp-4",
        projectId: "proj-2",
        description: "Dakisolatie materialen",
        amount: 8500,
        date: "2025-02-10",
        receiptUrl: "/receipts/exp-4.pdf",
        createdAt: "2025-02-10T09:45:00Z",
        updatedAt: "2025-02-10T09:45:00Z",
      }
    ],
    personnel: [
      {
        id: "pers-3",
        projectId: "proj-2",
        name: "Erik Jansen",
        role: "Installatietechnicus",
        dailyRate: 320,
        days: 15,
        totalCost: 4800,
      },
      {
        id: "pers-4",
        projectId: "proj-2",
        name: "Bas Willemsen",
        role: "Dakdekker",
        dailyRate: 310,
        days: 20,
        totalCost: 6200,
      }
    ],
    leads: ["2"],
    quotes: ["quote-2"],
    invoices: ["inv-2"],
    workAgreements: ["wa-2"],
    revenue: 105000,
    profit: 20000,
    photos: [
      { name: "Foto 1", url: "https://images.unsplash.com/photo-1611151595452-1a13902558e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { name: "Foto 2", url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    createdAt: "2025-01-20T14:00:00Z",
    updatedAt: "2025-03-15T12:00:00Z",
  }
];
