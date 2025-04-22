
import { useState, useRef } from "react";
import { Post, Comment, PostType } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, MessageSquare, Share, ArrowLeft, Send, Flag, MoreVertical } from "lucide-react";
import { formatDistance, format } from "date-fns";
import { nl } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { useCommunityComments, useCommunityReactions } from "@/hooks/use-community";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { CarouselItem, CarouselPrevious, CarouselContent, Carousel, CarouselNext } from "@/components/ui/carousel";
import { CommentItem } from "./CommentItem";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "./ReportDialog";

interface CommunityPostProps {
  post: Post;
  onBack: () => void;
}

export function CommunityPost({ post, onBack }: CommunityPostProps) {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { comments, addComment } = useCommunityComments(post.id);
  const { handleLike, handleDislike } = useCommunityReactions();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportingItem, setReportingItem] = useState<{id: string, type: 'post' | 'comment'} | null>(null);
  
  const postTypeMap = {
    [PostType.GENERAL]: { label: 'Algemeen', color: 'bg-gray-100 text-gray-800' },
    [PostType.JOB_LISTING]: { label: 'Personeel gezocht', color: 'bg-blue-100 text-blue-800' },
    [PostType.PROJECT_SHOWCASE]: { label: 'Project showcase', color: 'bg-green-100 text-green-800' },
    [PostType.OUTSOURCE_WORK]: { label: 'Werk uitbesteden', color: 'bg-amber-100 text-amber-800' },
    [PostType.TECHNICAL_ADVICE]: { label: 'Technisch advies', color: 'bg-purple-100 text-purple-800' },
    [PostType.LEGAL_ADVICE]: { label: 'Juridisch advies', color: 'bg-red-100 text-red-800' },
  };
  
  const handleSubmitComment = () => {
    if (comment.trim()) {
      addComment({
        content: comment,
        postId: post.id,
      });
      setComment("");
    }
  };
  
  const handleReplyComment = (content: string, parentId: string) => {
    addComment({
      content,
      postId: post.id,
      parentId
    });
  };

  const handleReportItem = (id: string, type: 'post' | 'comment') => {
    setReportingItem({ id, type });
    setReportDialogOpen(true);
  };

  const handleReportSubmit = (reason: string, details: string) => {
    // Here we would call API to submit the report
    console.log(`Reported ${reportingItem?.type} ${reportingItem?.id}: ${reason} - ${details}`);
    setReportDialogOpen(false);
    setReportingItem(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Terug</span>
        </Button>
      </div>
      
      {/* Main post */}
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium">{post.authorName}</h3>
                <span className="text-sm text-muted-foreground">
                  {formatDistance(new Date(post.createdAt), new Date(), { 
                    addSuffix: true,
                    locale: nl
                  })}
                </span>
                
                <Badge 
                  className={cn(
                    "ml-auto",
                    postTypeMap[post.type].color
                  )}
                  variant="outline"
                >
                  {postTypeMap[post.type].label}
                </Badge>
              </div>
              
              <Badge variant="outline" className="mt-1 bg-indigo-50 text-indigo-700">
                {post.groupName}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="whitespace-pre-line">{post.content}</p>
          
          {post.media && post.media.length > 0 && (
            <div className="mt-4">
              {post.media.length === 1 ? (
                <div className="rounded-md overflow-hidden">
                  {post.media[0].type === 'image' || post.media[0].type === 'gif' ? (
                    <img 
                      src={post.media[0].url} 
                      alt="" 
                      className="w-full h-auto max-h-[600px] object-contain bg-black/5"
                    />
                  ) : (
                    <div className="relative">
                      <AspectRatio ratio={16/9} className="bg-black">
                        <video 
                          src={post.media[0].url} 
                          poster={post.media[0].thumbnailUrl}
                          className="w-full h-full object-contain"
                          controls
                        />
                      </AspectRatio>
                    </div>
                  )}
                </div>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {post.media.map((media, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="rounded-md overflow-hidden">
                            {media.type === 'image' || media.type === 'gif' ? (
                              <img 
                                src={media.url} 
                                alt="" 
                                className="w-full h-auto max-h-[600px] object-contain bg-black/5"
                              />
                            ) : (
                              <div className="relative">
                                <AspectRatio ratio={16/9} className="bg-black">
                                  <video 
                                    src={media.url} 
                                    poster={media.thumbnailUrl}
                                    className="w-full h-full object-contain"
                                    controls
                                  />
                                </AspectRatio>
                              </div>
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  post.userReaction === 'like' && "text-green-600"
                )}
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>{post.likeCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  post.userReaction === 'dislike' && "text-red-600"
                )}
                onClick={() => handleDislike(post.id)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>{post.dislikeCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  if (commentInputRef.current) {
                    commentInputRef.current.focus();
                  }
                }}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{comments.length}</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href + '?post=' + post.id);
                }}
              >
                <Share className="h-4 w-4 mr-1" />
                <span>Delen</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleReportItem(post.id, 'post')}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    <span>Rapporteren</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Comment input */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                ref={commentInputRef}
                placeholder="Schrijf een reactie..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Plaatsen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Comments */}
      <Card className="shadow-md">
        <CardHeader className="pb-2 border-b">
          <h3 className="font-semibold">Reacties ({comments.length})</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p>Nog geen reacties. Wees de eerste!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onReply={handleReplyComment}
                  onReport={(commentId) => handleReportItem(commentId, 'comment')}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <ReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen} 
        itemType={reportingItem?.type || 'post'}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}
