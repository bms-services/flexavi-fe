
import { useState } from "react";
import { Post, PostType } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare, Flag, MoreVertical } from "lucide-react";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "./ReportDialog";

interface PostCardProps {
  post: Post;
  onClick: (postId: string) => void;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
}

export function PostCard({ post, onClick, onLike, onDislike }: PostCardProps) {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  const postTypeMap = {
    [PostType.GENERAL]: { label: 'Algemeen', color: 'bg-gray-100 text-gray-800' },
    [PostType.JOB_LISTING]: { label: 'Personeel gezocht', color: 'bg-blue-100 text-blue-800' },
    [PostType.PROJECT_SHOWCASE]: { label: 'Project showcase', color: 'bg-green-100 text-green-800' },
    [PostType.OUTSOURCE_WORK]: { label: 'Werk uitbesteden', color: 'bg-amber-100 text-amber-800' },
    [PostType.TECHNICAL_ADVICE]: { label: 'Technisch advies', color: 'bg-purple-100 text-purple-800' },
    [PostType.LEGAL_ADVICE]: { label: 'Juridisch advies', color: 'bg-red-100 text-red-800' },
  };
  
  const handlePostClick = (e: React.MouseEvent) => {
    // Don't trigger post click when clicking buttons or links inside the post
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    onClick(post.id);
  };
  
  const handleReportSubmit = (reason: string, details: string) => {
    // Here we would call API to submit the report
    console.log(`Reported post ${post.id}: ${reason} - ${details}`);
    setReportDialogOpen(false);
  };
  
  const hasMedia = post.media && post.media.length > 0;
  const firstMedia = hasMedia ? post.media[0] : null;
  
  return (
    <>
      <Card 
        className={cn(
          "shadow-sm hover:shadow-md transition-shadow", 
          "cursor-pointer overflow-hidden"
        )}
        onClick={handlePostClick}
      >
        <CardHeader className="p-4 pb-2">
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
        
        <CardContent className="p-4 pt-2">
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p className="line-clamp-3 text-sm text-gray-600">{post.content}</p>
          
          {hasMedia && (
            <div className="mt-3">
              <div className="rounded-md overflow-hidden">
                {firstMedia?.type === 'image' || firstMedia?.type === 'gif' ? (
                  <AspectRatio ratio={16/9} className="bg-gray-100">
                    <img 
                      src={firstMedia.url} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                    {post.media.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{post.media.length - 1} meer
                      </div>
                    )}
                  </AspectRatio>
                ) : firstMedia?.type === 'video' && (
                  <AspectRatio ratio={16/9} className="bg-gray-900">
                    <div className="relative w-full h-full">
                      <img 
                        src={firstMedia.thumbnailUrl || firstMedia.url} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-3">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </AspectRatio>
                )}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                post.userReaction === 'like' && "text-green-600"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onLike(post.id);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                onDislike(post.id);
              }}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{post.dislikeCount}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.commentCount}</span>
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className="text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setReportDialogOpen(true);
                }}
              >
                <Flag className="h-4 w-4 mr-2" />
                <span>Rapporteren</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
      
      <ReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen}
        itemType="post"
        onSubmit={handleReportSubmit}
      />
    </>
  );
}
