
import { useState } from "react";
import { KnowledgeBaseEntry, KnowledgeBaseCategory } from "@/types/knowledge-base";
import { mockKnowledgeBaseEntries, mockKnowledgeBaseCategories } from "@/data/mockKnowledgeBase";
import { v4 as uuidv4 } from "uuid";


export function useKnowledgeBase() {
  const [entries, setEntries] = useState<KnowledgeBaseEntry[]>(mockKnowledgeBaseEntries);
  const [categories, setCategories] = useState<KnowledgeBaseCategory[]>(mockKnowledgeBaseCategories);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Create a new knowledge base entry
  const createEntry = (entry: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    
    try {
      const newEntry: KnowledgeBaseEntry = {
        ...entry,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setEntries([...entries, newEntry]);
      
      return newEntry;
    } catch (error) {
      
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing knowledge base entry
  const updateEntry = (id: string, updatedEntry: Partial<KnowledgeBaseEntry>) => {
    setIsLoading(true);
    
    try {
      const updatedEntries = entries.map(entry => {
        if (entry.id === id) {
          return {
            ...entry,
            ...updatedEntry,
            updatedAt: new Date().toISOString()
          };
        }
        return entry;
      });
      
      setEntries(updatedEntries);
      
      return true;
    } catch (error) {
      
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a knowledge base entry
  const deleteEntry = (id: string) => {
    setIsLoading(true);
    
    try {
      const filteredEntries = entries.filter(entry => entry.id !== id);
      setEntries(filteredEntries);
      
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
      
      
      return true;
    } catch (error) {
      
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get an entry by ID
  const getEntryById = (id: string) => {
    return entries.find(entry => entry.id === id) || null;
  };

  // Get entries by category
  const getEntriesByCategory = (categoryId: string) => {
    return entries.filter(entry => entry.categoryId === categoryId);
  };

  // Get published entries (for public FAQ page)
  const getPublishedEntries = () => {
    return entries.filter(entry => entry.published);
  };

  // Category management
  const createCategory = (category: Omit<KnowledgeBaseCategory, 'id'>) => {
    const newCategory = {
      ...category,
      id: uuidv4()
    };
    
    setCategories([...categories, newCategory]);
    
    return newCategory;
  };

  const updateCategory = (id: string, updatedCategory: Partial<KnowledgeBaseCategory>) => {
    const updatedCategories = categories.map(category => {
      if (category.id === id) {
        return {
          ...category,
          ...updatedCategory
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    
    return true;
  };

  const deleteCategory = (id: string) => {
    // Check if category has entries
    const hasEntries = entries.some(entry => entry.categoryId === id);
    
    if (hasEntries) {
      
      return false;
    }
    
    const filteredCategories = categories.filter(category => category.id !== id);
    setCategories(filteredCategories);
    
    return true;
  };

  return {
    entries,
    categories,
    selectedEntry,
    isLoading,
    setSelectedEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntryById,
    getEntriesByCategory,
    getPublishedEntries,
    createCategory,
    updateCategory,
    deleteCategory
  };
}
