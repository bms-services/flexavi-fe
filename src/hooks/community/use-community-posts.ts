
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Post, PostFilters } from "@/types/community";
import { getUserReactions, setUserReactions } from "../utils/reactions";
import { currentUser } from "../utils/current-user";
import { getBasePosts } from "../utils/mock-posts";

export function useCommunityPosts(filters?: PostFilters) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredPosts = [...getBasePosts()];
      
      // Apply filters
      if (filters) {
        if (filters.groupId) {
          filteredPosts = filteredPosts.filter(post => post.groupId === filters.groupId);
        }
        
        if (filters.type) {
          filteredPosts = filteredPosts.filter(post => post.type === filters.type);
        }
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredPosts = filteredPosts.filter(
            post => 
              post.title.toLowerCase().includes(searchLower) || 
              post.content.toLowerCase().includes(searchLower)
          );
        }
        
        // Sort
        if (filters.sortBy === 'popular') {
          filteredPosts.sort((a, b) => (b.likeCount - b.dislikeCount) - (a.likeCount - a.dislikeCount));
        } else if (filters.sortBy === 'trending') {
          filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
        } else {
          // Default: newest
          filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }
      
      // Add user reactions
      const userReactions = getUserReactions();
      
      filteredPosts = filteredPosts.map(post => ({
        ...post,
        userReaction: userReactions[post.id] || null,
      }));
      
      setPosts(filteredPosts);
      setIsLoading(false);
    }, 700);
  }, [filters?.groupId, filters?.type, filters?.search, filters?.sortBy]);

  const createPost = async (postData: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newPost: Post = {
          id: `post-${uuidv4()}`,
          title: postData.title,
          content: postData.content,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorAvatar: currentUser.avatar,
          createdAt: new Date().toISOString(),
          groupId: postData.groupId,
          groupName: communityGroups.find(g => g.id === postData.groupId)?.name || "Onbekende groep",
          type: postData.type,
          likeCount: 0,
          dislikeCount: 0,
          commentCount: 0,
          media: postData.media || [],
        };
        
        // Update mock data
        const basePosts = getBasePosts();
        basePosts.unshift(newPost);
        
        resolve();
      }, 1000);
    });
  };
  
  return { posts, isLoading, createPost };
}
