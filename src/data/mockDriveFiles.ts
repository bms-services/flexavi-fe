
import { DriveFile } from "@/types/drive";
import { v4 as uuidv4 } from "uuid";

export const mockDriveFiles: DriveFile[] = [
  {
    id: "doc-1",
    name: "Project Voorstel Renovatie",
    type: "document",
    createdAt: "2025-03-15T12:30:00Z",
    updatedAt: "2025-04-10T09:45:00Z",
    createdBy: "Jan Jansen",
    parentId: null,
    content: {
      text: "<h1>Project Voorstel: Duurzame Dakrenovatie</h1><p>Dit document beschrijft het voorstel voor de dakrenovatie van het kantoorpand aan de Hoofdstraat 123 te Amsterdam.</p><h2>Doelstellingen</h2><p>Het doel van dit project is:</p><ul><li>Verbeteren van de waterdichtheid</li><li>Verhogen van de energiezuinigheid</li><li>Verlengen van de levensduur met minimaal 25 jaar</li></ul><h2>Planning</h2><p>De werkzaamheden staan gepland voor mei 2025 en zullen ongeveer 3 weken in beslag nemen, afhankelijk van de weersomstandigheden.</p>",
    },
    starred: true,
  },
  {
    id: "sheet-1",
    name: "Kostenberekening 2025",
    type: "spreadsheet",
    createdAt: "2025-03-18T14:20:00Z",
    updatedAt: "2025-04-12T16:35:00Z",
    createdBy: "Jan Jansen",
    parentId: null,
    content: {
      sheets: [
        {
          id: "sheet-1-tab-1",
          name: "Materiaalkosten",
          cells: {
            "A1": { value: "Product" },
            "B1": { value: "Prijs per eenheid" },
            "C1": { value: "Aantal" },
            "D1": { value: "Totaal", formula: "=B2*C2" },
            "A2": { value: "Dakpannen" },
            "B2": { value: "2.50" },
            "C2": { value: "1000" },
            "D2": { value: "2500", formula: "=B2*C2" },
            "A3": { value: "Isolatiemateriaal" },
            "B3": { value: "15.75" },
            "C3": { value: "50" },
            "D3": { value: "787.5", formula: "=B3*C3" },
            "A4": { value: "Hout" },
            "B4": { value: "12.30" },
            "C4": { value: "30" },
            "D4": { value: "369", formula: "=B4*C4" },
            "D5": { value: "3656.5", formula: "=SUM(D2:D4)" }
          },
          columns: 4,
          rows: 5,
        },
        {
          id: "sheet-1-tab-2",
          name: "Arbeidskosten",
          cells: {
            "A1": { value: "Medewerker" },
            "B1": { value: "Uurtarief" },
            "C1": { value: "Uren" },
            "D1": { value: "Totaal" },
            "A2": { value: "Voorman" },
            "B2": { value: "45" },
            "C2": { value: "40" },
            "D2": { value: "1800", formula: "=B2*C2" },
            "A3": { value: "Dakdekker 1" },
            "B3": { value: "35" },
            "C3": { value: "40" },
            "D3": { value: "1400", formula: "=B3*C3" },
            "A4": { value: "Dakdekker 2" },
            "B4": { value: "35" },
            "C4": { value: "40" },
            "D4": { value: "1400", formula: "=B4*C4" },
            "D5": { value: "4600", formula: "=SUM(D2:D4)" }
          },
          columns: 4,
          rows: 5,
        }
      ],
      activeSheet: 0,
    },
  },
  {
    id: "folder-1",
    name: "Klantprojecten",
    type: "folder",
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-03-10T09:00:00Z",
    createdBy: "Jan Jansen",
    parentId: null,
  },
  {
    id: "doc-2",
    name: "Offerte Template",
    type: "document",
    createdAt: "2025-04-01T10:15:00Z",
    updatedAt: "2025-04-05T11:20:00Z",
    createdBy: "Jan Jansen",
    parentId: "folder-1",
    content: {
      text: "<h1>Offerte</h1><p>Geachte [KLANTNAAM],</p><p>Hartelijk dank voor uw interesse in onze diensten. Hierbij ontvangt u onze offerte voor het project [PROJECTNAAM].</p><h2>Projectdetails</h2><p>[PROJECTBESCHRIJVING]</p><h2>Kostenspecificatie</h2><ul><li>Materiaalkosten: €[MATERIAALKOSTEN]</li><li>Arbeidskosten: €[ARBEIDSKOSTEN]</li><li>Transportkosten: €[TRANSPORTKOSTEN]</li></ul><p>Totaalbedrag exclusief BTW: €[TOTAAL_EX_BTW]</p><p>BTW 21%: €[BTW]</p><p>Totaalbedrag inclusief BTW: €[TOTAAL_INC_BTW]</p><h2>Voorwaarden</h2><p>Deze offerte is geldig tot [GELDIGHEIDSDATUM].</p>",
    },
  },
  {
    id: "sheet-2",
    name: "Projectplanning 2025",
    type: "spreadsheet",
    createdAt: "2025-04-02T13:40:00Z",
    updatedAt: "2025-04-15T14:30:00Z",
    createdBy: "Jan Jansen",
    parentId: "folder-1",
    content: {
      sheets: [
        {
          id: "sheet-2-tab-1",
          name: "Planning Q2",
          cells: {
            "A1": { value: "Project" },
            "B1": { value: "Start datum" },
            "C1": { value: "Eind datum" },
            "D1": { value: "Team" },
            "A2": { value: "Renovatie Amsterdam" },
            "B2": { value: "01-04-2025" },
            "C2": { value: "15-04-2025" },
            "D2": { value: "Team A" },
            "A3": { value: "Nieuwbouw Utrecht" },
            "B3": { value: "20-04-2025" },
            "C3": { value: "10-05-2025" },
            "D3": { value: "Team B" },
            "A4": { value: "Reparatie Rotterdam" },
            "B4": { value: "15-05-2025" },
            "C4": { value: "20-05-2025" },
            "D4": { value: "Team A" },
          },
          columns: 4,
          rows: 4,
        }
      ],
      activeSheet: 0,
    },
  },
];

export const createNewDocument = (name: string, parentId: string | null = null): DriveFile => {
  return {
    id: `doc-${uuidv4()}`,
    name,
    type: "document",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Jan Jansen",
    parentId,
    content: {
      text: "<p>Begin hier met typen...</p>",
    },
  };
};

export const createNewSpreadsheet = (name: string, parentId: string | null = null): DriveFile => {
  return {
    id: `sheet-${uuidv4()}`,
    name,
    type: "spreadsheet",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Jan Jansen",
    parentId,
    content: {
      sheets: [
        {
          id: `sheet-tab-${uuidv4()}`,
          name: "Blad 1",
          cells: {},
          columns: 10,
          rows: 20,
        }
      ],
      activeSheet: 0,
    },
  };
};

export const createNewFolder = (name: string, parentId: string | null = null): DriveFile => {
  return {
    id: `folder-${uuidv4()}`,
    name,
    type: "folder",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Jan Jansen",
    parentId,
  };
};
