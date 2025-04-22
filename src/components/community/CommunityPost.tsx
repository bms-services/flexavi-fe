
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Share, 
  ThumbsDown,
  MoreHorizontal,
  Flag
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatTimeAgo } from "@/utils/format";
import { Post, Comment } from "@/types/community";
import { CommentItem } from "./CommentItem";
import { CommentReplyForm } from "./CommentReplyForm";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "./ReportDialog";
import { toast } from "sonner";
import { useCommunityReactions } from "@/hooks/use-community";

interface CommunityPostProps {
  post: Post;
  onBack: () => void;
}

export function CommunityPost({ post, onBack }: CommunityPostProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const { handleLike, handleDislike } = useCommunityReactions();
  
  // Create default author object if not present
  const author = post.author || {
    id: post.authorId,
    name: post.authorName,
    avatar: post.authorAvatar,
    badge: undefined
  };

  // Create default group object if not present
  const group = post.group || {
    id: post.groupId,
    name: post.groupName,
    description: "",
    icon: "",
    memberCount: 0,
    postCount: 0,
    color: ""
  };
  
  // Ensure likes and dislikes are available
  const likes = post.likes || post.likeCount || 0;
  const dislikes = post.dislikes || post.dislikeCount || 0;
  
  const handleReport = (reason: string, details: string) => {
    console.log("Reporting post:", post.id, reason, details);
    toast.success("Bedankt voor je melding. We zullen dit bericht beoordelen.");
    setShowReportDialog(false);
  };
  
  const handleSubmitComment = (content: string, parentId?: string) => {
    console.log("New comment:", content, "replying to:", parentId || "main post");
    setReplyingTo(null);
    toast.success("Reactie geplaatst");
  };
  
  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };
  
  const handleLikeComment = (commentId: string) => {
    console.log("Like comment:", commentId);
  };
  
  const handleDislikeComment = (commentId: string) => {
    console.log("Dislike comment:", commentId);
  };

  // Get the image URL from either direct image property or first media item
  const imageUrl = post.image || (post.media && post.media.length > 0 ? post.media[0].url : undefined);
  
  // Helper function to create author object for comments
  const createCommentAuthor = (comment: Comment) => {
    return comment.author || {
      id: comment.authorId,
      name: comment.authorName,
      avatar: comment.authorAvatar,
      badge: undefined
    };
  };
  
  // Helper function to prepare comment for CommentItem
  const prepareCommentForDisplay = (comment: Comment) => {
    return {
      ...comment,
      author: createCommentAuthor(comment),
      likes: comment.likes || comment.likeCount || 0,
      dislikes: comment.dislikes || comment.dislikeCount || 0
    };
  };
  
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onBack} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Terug
      </Button>
      
      <Card>
        <CardHeader className="p-4 pb-0 flex-row items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{author.name}</span>
              {author.badge && (
                <Badge variant="outline" className="text-xs font-normal">
                  {author.badge}
                </Badge>
              )}
              {group && (
                <Badge variant="secondary" className="text-xs font-normal">
                  {group.name}
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatTimeAgo(new Date(post.createdAt))}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                <Flag className="h-4 w-4 mr-2" />
                Rapporteren
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Delen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent className="p-4">
          <h1 className="text-xl font-semibold">{post.title}</h1>
          
          <div className="mt-3 text-sm whitespace-pre-wrap">
            {post.content}
          </div>
          
          {imageUrl && (
            <div className="mt-4 rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt={post.title}
                className="w-full object-cover" 
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-3 border-t flex justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-muted-foreground gap-1"
              onClick={() => handleLike(post.id)}
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
              onClick={() => handleDislike(post.id)}
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
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="p-4 pb-0">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reacties ({post.commentCount})
          </h2>
        </CardHeader>
        
        <CardContent className="p-4">
          <CommentReplyForm 
            onSubmit={handleSubmitComment}
            parentId="" 
          />
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            {post.comments?.map((comment) => {
              const preparedComment = prepareCommentForDisplay(comment);
              
              return (
                <div key={comment.id}>
                  <CommentItem 
                    comment={preparedComment}
                    onReply={handleReply}
                    onLike={handleLikeComment}
                    onDislike={handleDislikeComment}
                  >
                    {replyingTo === comment.id && (
                      <div className="pl-6">
                        <CommentReplyForm 
                          parentId={comment.id}
                          onSubmit={handleSubmitComment}
                          onCancel={() => setReplyingTo(null)}
                          replyingTo={preparedComment.author.name}
                        />
                      </div>
                    )}
                    
                    {comment.replies?.map((reply) => {
                      const preparedReply = prepareCommentForDisplay(reply);
                      
                      return (
                        <CommentItem 
                          key={reply.id}
                          comment={preparedReply}
                          onReply={() => handleReply(reply.id)}
                          onLike={handleLikeComment}
                          onDislike={handleDislikeComment}
                          depth={1}
                        >
                          {replyingTo === reply.id && (
                            <div className="pl-6">
                              <CommentReplyForm 
                                parentId={reply.id}
                                onSubmit={handleSubmitComment}
                                onCancel={() => setReplyingTo(null)}
                                replyingTo={preparedReply.author.name}
                              />
                            </div>
                          )}
                          
                          {reply.replies?.map((nestedReply) => {
                            const preparedNestedReply = prepareCommentForDisplay(nestedReply);
                            
                            return (
                              <CommentItem 
                                key={nestedReply.id}
                                comment={preparedNestedReply}
                                onReply={() => handleReply(nestedReply.id)}
                                onLike={handleLikeComment}
                                onDislike={handleDislikeComment}
                                depth={2}
                              />
                            );
                          })}
                        </CommentItem>
                      );
                    })}
                  </CommentItem>
                  <Separator />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <ReportDialog 
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        itemType="post"
        onSubmit={handleReport}
      />
    </div>
  );
}
