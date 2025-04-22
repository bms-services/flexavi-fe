
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { FAQCategories } from "@/components/faq/FAQCategories";
import { FAQGrid } from "@/components/faq/FAQGrid";
import { FAQDetailDialog } from "@/components/faq/FAQDetailDialog";
import { useKnowledgeBase } from "@/hooks/use-knowledge-base";
import { KnowledgeBaseEntry } from "@/types/knowledge-base";

export default function KnowledgeBase() {
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
    <Layout>
      <div className="container py-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Kennisbank</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vind snel antwoorden op veelgestelde vragen over ons platform.
          </p>
        </div>
        
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
      </div>
    </Layout>
  );
}
