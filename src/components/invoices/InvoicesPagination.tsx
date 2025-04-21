
import React from "react";
import { Button } from "@/components/ui/button";

interface InvoicesPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const InvoicesPagination: React.FC<InvoicesPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => (
  <div className="flex items-center gap-1">
    <Button
      size="icon"
      variant="ghost"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      <span className="sr-only">Vorige</span>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M13 16l-4-4 4-4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </Button>
    <span className="text-xs mx-2">
      {currentPage} / {totalPages}
    </span>
    <Button
      size="icon"
      variant="ghost"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      <span className="sr-only">Volgende</span>
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M7 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </Button>
  </div>
);
