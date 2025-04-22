
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { useKnowledgeBase } from '@/hooks/use-knowledge-base';
import { KnowledgeBaseTable } from '@/components/admin/knowledge-base/KnowledgeBaseTable';
import { KnowledgeBaseHeader } from '@/components/admin/knowledge-base/KnowledgeBaseHeader';
import { KnowledgeBaseEntryDialog } from '@/components/admin/knowledge-base/KnowledgeBaseEntryDialog';
import { CategoryDialog } from '@/components/admin/knowledge-base/CategoryDialog';
import { DeleteEntryDialog } from '@/components/admin/knowledge-base/DeleteEntryDialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { KnowledgeBaseEntry } from '@/types/knowledge-base';

export function KnowledgeBaseManagement() {
  const {
    entries,
    categories,
    createEntry,
    updateEntry,
    deleteEntry,
    createCategory,
    updateCategory
  } = useKnowledgeBase();

  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleCreateEntry = () => {
    setSelectedEntry(null);
    setEntryDialogOpen(true);
  };

  const handleEditEntry = (entry: KnowledgeBaseEntry) => {
    setSelectedEntry(entry);
    setEntryDialogOpen(true);
  };

  const handleDeleteEntry = (entry: KnowledgeBaseEntry) => {
    setSelectedEntry(entry);
    setDeleteDialogOpen(true);
  };

  const handleSaveEntry = (entryData: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedEntry) {
      updateEntry(selectedEntry.id, entryData);
    } else {
      createEntry(entryData);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEntry) {
      deleteEntry(selectedEntry.id);
      setDeleteDialogOpen(false);
    }
  };

  const handleCreateCategory = () => {
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = (categoryData: any) => {
    createCategory(categoryData);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") {
      return matchesSearch;
    } else if (activeTab === "published") {
      return matchesSearch && entry.published;
    } else if (activeTab === "drafts") {
      return matchesSearch && !entry.published;
    } else {
      return matchesSearch && entry.categoryId === activeTab;
    }
  });

  return (
    <div className="space-y-6">
      <KnowledgeBaseHeader 
        onCreateEntry={handleCreateEntry}
        onCreateCategory={handleCreateCategory}
      />
      
      <div className="mb-6 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Zoeken in kennisbank..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs 
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">Alle items</TabsTrigger>
          <TabsTrigger value="published">Gepubliceerd</TabsTrigger>
          <TabsTrigger value="drafts">Concepten</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <KnowledgeBaseTable
            entries={filteredEntries}
            categories={categories}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </TabsContent>
      </Tabs>

      <KnowledgeBaseEntryDialog
        open={entryDialogOpen}
        onOpenChange={setEntryDialogOpen}
        onSave={handleSaveEntry}
        entry={selectedEntry || undefined}
        categories={categories}
      />

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSave={handleSaveCategory}
      />

      <DeleteEntryDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        entry={selectedEntry}
      />
    </div>
  );
}
