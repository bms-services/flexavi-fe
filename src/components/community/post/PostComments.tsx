import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare } from "lucide-react";
import { Author, Comment, Post } from "@/types/community";
import { CommentItem } from "../CommentItem";
import { CommentReplyForm } from "../CommentReplyForm";

interface PostCommentsProps {
  post: Post;
  comments?: Comment[];
  replyingTo: string | null;
  onReply: (commentId: string) => void;
  onCancelReply: () => void;
  onSubmitComment: (content: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
  onDislikeComment: (commentId: string) => void;
}

export function PostComments({ 
  post,
  comments = [],
  replyingTo,
  onReply,
  onCancelReply,
  onSubmitComment,
  onLikeComment,
  onDislikeComment
}: PostCommentsProps) {
  const ensureAuthor = (comment: Comment): Comment & { author: Author } => {
    if (comment.author) {
      return comment as Comment & { author: Author };
    }
    
    return {
      ...comment,
      author: {
        id: comment.authorId,
        name: comment.authorName,
        avatar: comment.authorAvatar
      }
    };
  };

  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Reacties ({post.commentCount})
        </h2>
      </CardHeader>
      
      <CardContent className="p-4">
        <CommentReplyForm 
          onSubmit={onSubmitComment}
          parentId=""
        />
        
        <Separator className="my-4" />
        
        <div className="space-y-1">
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem 
                comment={ensureAuthor(comment)}
                onReply={onReply}
                onLike={onLikeComment}
                onDislike={onDislikeComment}
              >
                {replyingTo === comment.id && (
                  <div className="pl-6">
                    <CommentReplyForm 
                      parentId={comment.id}
                      onSubmit={onSubmitComment}
                      onCancel={onCancelReply}
                      replyingTo={ensureAuthor(comment).author.name}
                    />
                  </div>
                )}
                
                {comment.replies?.map((reply) => (
                  <CommentItem 
                    key={reply.id}
                    comment={ensureAuthor(reply)}
                    onReply={() => onReply(reply.id)}
                    onLike={onLikeComment}
                    onDislike={onDislikeComment}
                    depth={1}
                  >
                    {replyingTo === reply.id && (
                      <div className="pl-6">
                        <CommentReplyForm 
                          parentId={reply.id}
                          onSubmit={onSubmitComment}
                          onCancel={onCancelReply}
                          replyingTo={ensureAuthor(reply).author.name}
                        />
                      </div>
                    )}
                  </CommentItem>
                ))}
              </CommentItem>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
