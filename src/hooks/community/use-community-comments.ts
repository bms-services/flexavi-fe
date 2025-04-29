
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "@/types/community";
import { getUserReactions } from "./utils/reactions";
import { currentUser } from "./utils/current-user";
import { commentsMap } from "./utils/mock-comments";
import { getBasePosts } from "./utils/mock-posts";

export function useCommunityComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  
  useEffect(() => {
    // Get comments for the post, or empty array if none exist
    const postComments = commentsMap[postId] || [];
    
    // Add user reactions
    const userReactions = getUserReactions();
    
    // Structure comments to support nested replies
    const commentsWithReplies: Comment[] = [];
    const replyMap: Record<string, Comment[]> = {};
    
    // First sort all comments by parentId
    postComments.forEach(comment => {
      const commentWithReaction = {
        ...comment,
        userReaction: userReactions[comment.id] || null,
        replies: [],
      };
      
      if (!comment.parentId) {
        // This is a top-level comment
        commentsWithReplies.push(commentWithReaction);
      } else {
        // This is a reply to another comment
        if (!replyMap[comment.parentId]) {
          replyMap[comment.parentId] = [];
        }
        replyMap[comment.parentId].push(commentWithReaction);
      }
    });
    
    // Add replies to their parents
    commentsWithReplies.forEach(comment => {
      if (replyMap[comment.id]) {
        comment.replies = replyMap[comment.id];
      }
    });
    
    setComments(commentsWithReplies);
  }, [postId]);
  
  const addComment = (commentData: { content: string; postId: string; parentId?: string }) => {
    const newComment: Comment = {
      id: `comment-${postId}-${uuidv4()}`,
      postId: commentData.postId,
      content: commentData.content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      dislikeCount: 0,
      parentId: commentData.parentId,
    };
    
    setComments(prev => {
      if (!commentData.parentId) {
        // Add as new top-level comment
        const newCommentWithReplies = {...newComment, replies: []};
        return [newCommentWithReplies, ...prev];
      } else {
        // Add as reply to existing comment
        return prev.map(comment => {
          if (comment.id === commentData.parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment]
            };
          }
          return comment;
        });
      }
    });
    
    // Update mock data
    if (!commentsMap[postId]) {
      commentsMap[postId] = [];
    }
    commentsMap[postId].unshift(newComment);
    
    // Update post comment count
    const posts = getBasePosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      posts[postIndex].commentCount += 1;
    }
  };
  
  return { comments, addComment };
}
