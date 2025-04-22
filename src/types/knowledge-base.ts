
export type KnowledgeBaseEntryType = 'text' | 'image' | 'video';

export interface KnowledgeBaseEntry {
  id: string;
  question: string;
  answer: string;
  type: KnowledgeBaseEntryType;
  mediaUrl?: string;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface KnowledgeBaseCategory {
  id: string;
  name: string;
  description?: string;
}
