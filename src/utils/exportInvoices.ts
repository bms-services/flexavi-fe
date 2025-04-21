
import { Invoice } from "@/types";

export function exportInvoicesCSV(invoices: Invoice[]) {
  const headers = [
    "Factuurnummer",
    "Klant",
    "Omschrijving",
    "Datum",
    "Vervaldatum",
    "Bedrag",
    "Status"
  ];
  const rows = invoices.map(inv => [
    inv.id.replace("inv-", "FACT-"),
    inv.leadId, // Gebruik eventueel klantnaam hier
    inv.description,
    inv.createdAt,
    inv.dueDate,
    inv.amount.toFixed(2).replace('.', ','),
    inv.status
  ]);

  const content = [headers, ...rows]
    .map(row => row.map(val => `"${val}"`).join(";"))
    .join("\n");

  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Facturen-export.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function exportInvoicesPDF(invoices: Invoice[]) {
  // MOCK: In werkelijkheid gebruik je bijv. jsPDF, hier een simpele oplossing
  alert("PDF-export is als voorbeeld geïmplementeerd. Hier zou je jsPDF kunnen integreren.");
}
