
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types/community";
import { Flag, MoreHorizontal, Share } from "lucide-react";
import { formatTimeAgo } from "@/utils/format";

interface PostHeaderProps {
  post: Post;
  onOpenReport: () => void;
}

export function PostHeader({ post, onOpenReport }: PostHeaderProps) {
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

  return (
    <div className="p-4 pb-0 flex-row items-start gap-3">
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
          <DropdownMenuItem onClick={onOpenReport}>
            <Flag className="h-4 w-4 mr-2" />
            Rapporteren
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share className="h-4 w-4 mr-2" />
            Delen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
