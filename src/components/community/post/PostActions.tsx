
import { Button } from "@/components/ui/button";
import { Post } from "@/types/community";
import { Heart, MessageSquare, Share, ThumbsDown } from "lucide-react";

interface PostActionsProps {
  post: Post;
  onLike: () => void;
  onDislike: () => void;
}

export function PostActions({ post, onLike, onDislike }: PostActionsProps) {
  // Ensure likes and dislikes are available
  const likes = post.likes || post.likeCount || 0;
  const dislikes = post.dislikes || post.dislikeCount || 0;

  return (
    <div className="p-3 border-t flex justify-between">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground gap-1"
          onClick={onLike}
        >
          <Heart 
            className={`h-4 w-4 ${post.hasLiked ? "fill-red-500 text-red-500" : ""}`} 
          />
          <span>{likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground gap-1"
          onClick={onDislike}
        >
          <ThumbsDown 
            className={`h-4 w-4 ${post.hasDisliked ? "fill-gray-500 text-gray-500" : ""}`} 
          />
          <span>{dislikes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground gap-1"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{post.commentCount}</span>
        </Button>
      </div>
      
      <Button variant="ghost" size="sm">
        <Share className="h-4 w-4 mr-1" />
        Delen
      </Button>
    </div>
  );
}
