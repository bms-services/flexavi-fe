
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";
import { Post, PostType } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageSquare, Share } from "lucide-react";
import { useCommunityReactions } from "@/hooks/use-community";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  const { handleLike, handleDislike } = useCommunityReactions();
  
  const postTypeMap = {
    [PostType.GENERAL]: { label: 'Algemeen', color: 'bg-gray-100 text-gray-800' },
    [PostType.JOB_LISTING]: { label: 'Personeel gezocht', color: 'bg-blue-100 text-blue-800' },
    [PostType.PROJECT_SHOWCASE]: { label: 'Project showcase', color: 'bg-green-100 text-green-800' },
    [PostType.OUTSOURCE_WORK]: { label: 'Werk uitbesteden', color: 'bg-amber-100 text-amber-800' },
    [PostType.TECHNICAL_ADVICE]: { label: 'Technisch advies', color: 'bg-purple-100 text-purple-800' },
    [PostType.LEGAL_ADVICE]: { label: 'Juridisch advies', color: 'bg-red-100 text-red-800' },
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
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
            
            <div 
              className="mt-1 text-sm text-gray-800 cursor-pointer"
              onClick={onClick}
            >
              <h4 className="font-medium text-base mt-2 mb-1">{post.title}</h4>
              <p className="line-clamp-3">{post.content}</p>
            </div>
            
            {post.media && post.media.length > 0 && (
              <div className="mt-3 cursor-pointer" onClick={onClick}>
                {post.media.length === 1 ? (
                  <div className="rounded-md overflow-hidden">
                    {post.media[0].type === 'image' ? (
                      <img 
                        src={post.media[0].url} 
                        alt="" 
                        className="w-full h-auto max-h-[400px] object-cover"
                      />
                    ) : (
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <video 
                            src={post.media[0].url} 
                            poster={post.media[0].thumbnailUrl}
                            className="w-full h-full object-cover"
                            controls={false}
                          />
                        </AspectRatio>
                      </div>
                    )}
                  </div>
                ) : (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {post.media.map((media, index) => (
                        <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                          <div className="p-1">
                            <div className="rounded-md overflow-hidden">
                              {media.type === 'image' ? (
                                <img 
                                  src={media.url} 
                                  alt="" 
                                  className="w-full h-[200px] object-cover"
                                />
                              ) : (
                                <div className="relative">
                                  <AspectRatio ratio={16/9}>
                                    <video 
                                      src={media.url} 
                                      poster={media.thumbnailUrl}
                                      className="w-full h-full object-cover"
                                      controls={false}
                                    />
                                  </AspectRatio>
                                </div>
                              )}
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 border-t flex items-center justify-between flex-wrap gap-y-2">
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
            {post.groupName}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-muted-foreground", 
              post.userReaction === 'like' && "text-green-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(post.id);
            }}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{post.likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-muted-foreground",
              post.userReaction === 'dislike' && "text-red-600" 
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleDislike(post.id);
            }}
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            <span>{post.dislikeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
            onClick={onClick}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{post.commentCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality
              navigator.clipboard.writeText(window.location.href + '?post=' + post.id);
            }}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
