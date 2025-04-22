
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  MessageSquare, 
  Heart, 
  ThumbsDown, 
  Image,
  FileText,
  Link as LinkIcon,
  MoreHorizontal,
  Flag,
  Share
} from "lucide-react";
import { formatTimeAgo } from "@/utils/format";
import { Post, PostType } from "@/types/community";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ReportDialog } from "./ReportDialog";
import { toast } from "sonner";

export interface PostCardProps {
  post: Post;
  onClick: () => void;
  onLike: (postId: string) => void;
  onDislike: (postId: string) => void;
}

export function PostCard({ post, onClick, onLike, onDislike }: PostCardProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const handleReport = (reason: string, details: string) => {
    console.log("Reporting post:", post.id, reason, details);
    toast.success("Bedankt voor je melding. We zullen dit bericht beoordelen.");
    setShowReportDialog(false);
  };
  
  const getPostTypeIcon = () => {
    switch (post.type) {
      case PostType.IMAGE:
        return <Image className="h-4 w-4" />;
      case PostType.ARTICLE:
        return <FileText className="h-4 w-4" />;
      case PostType.LINK:
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
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
  
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
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
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{formatTimeAgo(new Date(post.createdAt))}</span>
            <span className="mx-1">•</span>
            <span className="flex items-center">
              {getPostTypeIcon()}
              <span className="ml-1 capitalize">{post.type}</span>
            </span>
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
      
      <div onClick={onClick} className="cursor-pointer">
        <CardContent className="p-4 pt-3">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          
          {post.content && (
            <div className="mt-2 text-sm">
              {post.content.length > 200
                ? `${post.content.slice(0, 200)}...`
                : post.content}
            </div>
          )}
          
          {(post.image || (post.media && post.media.length > 0)) && (
            <div className="mt-3 rounded-md overflow-hidden">
              <img 
                src={post.image || (post.media && post.media[0]?.url)}
                alt={post.title}
                className="w-full h-[200px] object-cover" 
              />
            </div>
          )}
        </CardContent>
      </div>
      
      <CardFooter className="p-3 pt-0 border-t flex justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-muted-foreground gap-1"
            onClick={() => onLike(post.id)}
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
            onClick={() => onDislike(post.id)}
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
            onClick={onClick}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </Button>
        </div>
      </CardFooter>
      
      <ReportDialog 
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        itemType="post"
        onSubmit={handleReport}
      />
    </Card>
  );
}
