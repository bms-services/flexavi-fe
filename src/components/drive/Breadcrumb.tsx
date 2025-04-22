
import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { id: string | null; name: string }[];
  onNavigate: (id: string | null) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />}
            <button
              onClick={() => onNavigate(item.id)}
              className={`inline-flex items-center text-sm hover:text-blue-600 ${
                index === items.length - 1
                  ? "font-medium text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};
