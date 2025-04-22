
import { getBasePosts } from "./utils/mock-posts";
import { commentsMap } from "./utils/mock-comments";
import { getUserReactions, setUserReactions } from "./utils/reactions";

export function useCommunityReactions() {
  const handleReaction = (
    itemId: string, 
    reactionType: 'like' | 'dislike', 
    isComment: boolean = false
  ) => {
    // Get current reactions
    const userReactions = getUserReactions();
    const currentReaction = userReactions[itemId];
    
    // Toggle reaction
    if (currentReaction === reactionType) {
      // Remove reaction if clicking the same button
      userReactions[itemId] = null;
    } else {
      // Set new reaction
      userReactions[itemId] = reactionType;
    }
    
    // Save reactions
    setUserReactions(userReactions);
    
    if (isComment) {
      // Update comment like/dislike count
      for (const postId in commentsMap) {
        const commentIndex = commentsMap[postId].findIndex(c => c.id === itemId);
        if (commentIndex !== -1) {
          // Reset counts first
          if (currentReaction === 'like') commentsMap[postId][commentIndex].likeCount--;
          if (currentReaction === 'dislike') commentsMap[postId][commentIndex].dislikeCount--;
          
          // Then add the new reaction
          if (userReactions[itemId] === 'like') commentsMap[postId][commentIndex].likeCount++;
          if (userReactions[itemId] === 'dislike') commentsMap[postId][commentIndex].dislikeCount++;
          
          break;
        }
      }
    } else {
      // Update post like/dislike count
      const posts = getBasePosts();
      const postIndex = posts.findIndex(p => p.id === itemId);
      
      if (postIndex !== -1) {
        // Reset counts first
        if (currentReaction === 'like') posts[postIndex].likeCount--;
        if (currentReaction === 'dislike') posts[postIndex].dislikeCount--;
        
        // Then add the new reaction
        if (userReactions[itemId] === 'like') posts[postIndex].likeCount++;
        if (userReactions[itemId] === 'dislike') posts[postIndex].dislikeCount++;
      }
    }
  };
  
  const handleLike = (itemId: string, isComment: boolean = false) => {
    handleReaction(itemId, 'like', isComment);
  };
  
  const handleDislike = (itemId: string, isComment: boolean = false) => {
    handleReaction(itemId, 'dislike', isComment);
  };
  
  return { handleLike, handleDislike };
}
