
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ReportDialog } from "./ReportDialog";
import { Post } from "@/types/community";
import { toast } from "sonner";
import { PostHeader } from "./post/PostHeader";
import { PostContent } from "./post/PostContent";
import { PostActions } from "./post/PostActions";
import { PostComments } from "./post/PostComments";
import { useCommunityComments, useCommunityReactions } from "@/hooks/use-community";

interface CommunityPostProps {
  post: Post;
  onBack: () => void;
}

export function CommunityPost({ post, onBack }: CommunityPostProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { comments, addComment } = useCommunityComments(post.id);
  const { handleLike, handleDislike } = useCommunityReactions();
  
  const handleReport = (reason: string, details: string) => {
    console.log("Reporting post:", post.id, reason, details);
    toast.success("Bedankt voor je melding. We zullen dit bericht beoordelen.");
    setShowReportDialog(false);
  };
  
  const handleSubmitComment = (content: string, parentId?: string) => {
    addComment({ content, postId: post.id, parentId });
    setReplyingTo(null);
    toast.success("Reactie geplaatst");
  };
  
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onBack} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Terug
      </Button>
      
      <Card>
        <PostHeader 
          post={post}
          onOpenReport={() => setShowReportDialog(true)}
        />
        <PostContent post={post} />
        <PostActions 
          post={post}
          onLike={() => handleLike(post.id)}
          onDislike={() => handleDislike(post.id)}
        />
      </Card>
      
      <PostComments 
        post={post}
        comments={comments}
        replyingTo={replyingTo}
        onReply={setReplyingTo}
        onCancelReply={() => setReplyingTo(null)}
        onSubmitComment={handleSubmitComment}
        onLikeComment={(commentId) => handleLike(commentId, true)}
        onDislikeComment={(commentId) => handleDislike(commentId, true)}
      />
      
      <ReportDialog 
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        itemType="post"
        onSubmit={handleReport}
      />
    </div>
  );
}
