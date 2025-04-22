
import React from "react";
import { KnowledgeBaseCategory } from "@/types/knowledge-base";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FAQCategoriesProps {
  categories: KnowledgeBaseCategory[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function FAQCategories({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: FAQCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        className={cn(
          "rounded-full", 
          activeCategory === "all" ? "bg-primary" : ""
        )}
      >
        Alle vragen
      </Button>
      
      {categories.map(category => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "rounded-full",
            activeCategory === category.id ? "bg-primary" : ""
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
