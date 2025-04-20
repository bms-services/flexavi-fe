
import React from "react";
import { ReceiptData } from "../types/quickActions";

interface ReceiptFormFieldsProps {
  receiptData: ReceiptData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const ReceiptFormFields: React.FC<ReceiptFormFieldsProps> = ({
  receiptData,
  onInputChange,
  disabled = false,
}) => (
  <>
    <div>
      <label htmlFor="company" className="text-sm font-medium">Bedrijf</label>
      <input
        id="company"
        name="company"
        value={receiptData.company}
        onChange={onInputChange}
        className="w-full border rounded-md p-2 mt-1"
        disabled={disabled}
      />
    </div>
    <div>
      <label htmlFor="description" className="text-sm font-medium">Omschrijving</label>
      <input
        id="description"
        name="description"
        value={receiptData.description}
        onChange={onInputChange}
        className="w-full border rounded-md p-2 mt-1"
        disabled={disabled}
      />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label htmlFor="subtotal" className="text-sm font-medium">Subtotaal</label>
        <input
          id="subtotal"
          name="subtotal"
          value={receiptData.subtotal}
          onChange={onInputChange}
          className="w-full border rounded-md p-2 mt-1"
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="vat" className="text-sm font-medium">BTW %</label>
        <input
          id="vat"
          name="vat"
          value={receiptData.vat}
          onChange={onInputChange}
          className="w-full border rounded-md p-2 mt-1"
          disabled={disabled}
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label htmlFor="vatPaid" className="text-sm font-medium">BTW betaald</label>
        <input
          id="vatPaid"
          name="vatPaid"
          value={receiptData.vatPaid}
          onChange={onInputChange}
          className="w-full border rounded-md p-2 mt-1"
          disabled={disabled}
        />
      </div>
      <div>
        <label htmlFor="total" className="text-sm font-medium">Totaal bedrag</label>
        <input
          id="total"
          name="total"
          value={receiptData.total}
          onChange={onInputChange}
          className="w-full border rounded-md p-2 mt-1"
          disabled={disabled}
        />
      </div>
    </div>
    <div>
      <label htmlFor="project" className="text-sm font-medium">Project (optioneel)</label>
      <select
        id="project"
        name="project"
        value={receiptData.project}
        onChange={onInputChange}
        className="w-full border rounded-md p-2 mt-1"
        disabled={disabled}
      >
        <option value="">Selecteer een project</option>
        <option value="project1">Renovatie Amsterdam</option>
        <option value="project2">Nieuwbouw Utrecht</option>
        <option value="project3">Verbouwing Rotterdam</option>
      </select>
    </div>
  </>
);
