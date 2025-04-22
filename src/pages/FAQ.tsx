
import React, { useState } from "react";
import { FAQLayout } from "@/components/faq/FAQLayout";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { FAQCategories } from "@/components/faq/FAQCategories";
import { FAQGrid } from "@/components/faq/FAQGrid";
import { FAQDetailDialog } from "@/components/faq/FAQDetailDialog";
import { useKnowledgeBase } from "@/hooks/use-knowledge-base";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";

export default function FAQ() {
  const { categories, getPublishedEntries } = useKnowledgeBase();
  const publishedEntries = getPublishedEntries();
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleEntrySelect = (entry: KnowledgeBaseEntry) => {
    setSelectedEntry(entry);
    setDetailDialogOpen(true);
  };

  const filteredEntries = publishedEntries.filter(entry => {
    const matchesSearch = entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          entry.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && entry.categoryId === activeCategory;
    }
  });

  return (
    <FAQLayout>
      <FAQSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <FAQCategories
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />
      
      <FAQGrid
        entries={filteredEntries}
        onSelectEntry={handleEntrySelect}
      />
      
      <FAQDetailDialog
        entry={selectedEntry}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </FAQLayout>
  );
}
