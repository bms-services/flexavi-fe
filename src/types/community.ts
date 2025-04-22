
export enum PostType {
  GENERAL = "general",
  JOB_LISTING = "job_listing",
  PROJECT_SHOWCASE = "project_showcase",
  OUTSOURCE_WORK = "outsource_work",
  TECHNICAL_ADVICE = "technical_advice",
  LEGAL_ADVICE = "legal_advice",
  IMAGE = "image",
  ARTICLE = "article",
  LINK = "link"
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  badge?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  groupId: string;
  groupName: string;
  type: PostType;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  media?: PostMedia[];
  userReaction?: 'like' | 'dislike' | null;
  
  // Additional properties needed by components
  author?: Author;
  group?: Group;
  image?: string;
  likes?: number;
  dislikes?: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
  comments?: Comment[];
}

export type PostMedia = {
  id: string;
  type: 'image' | 'video' | 'gif';
  url: string;
  thumbnailUrl?: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  userReaction?: 'like' | 'dislike' | null;
  parentId?: string; // ID van de ouder-reactie (voor reacties op reacties)
  replies?: Comment[]; // Reacties op deze reactie
  
  // Additional properties needed by components
  author?: Author;
  likes?: number;
  dislikes?: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  postCount: number;
  color: string;
}

export type PostFilters = {
  groupId?: string;
  type?: PostType;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'trending';
}
