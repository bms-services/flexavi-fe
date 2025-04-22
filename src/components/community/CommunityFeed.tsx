
import { useState, useEffect } from "react";
import { useCommunityPosts, useCommunityReactions } from "@/hooks/community";
import { CommunityPost } from "./CommunityPost";
import { PostCard } from "./PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostFilters, Post } from "@/types/community";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityFeedProps {
  groupFilter?: string;
}

export function CommunityFeed({ groupFilter }: CommunityFeedProps) {
  const [searchParams] = useSearchParams();
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const { handleLike, handleDislike } = useCommunityReactions();
  
  const filters: PostFilters = {
    groupId: groupFilter,
    type: searchParams.get("type") as any || undefined,
    search: searchParams.get("search") || undefined,
    sortBy: (searchParams.get("sortBy") as any) || "newest",
  };
  
  const { posts, isLoading } = useCommunityPosts(filters);

  // Close post detail when filters change
  useEffect(() => {
    setOpenPost(null);
  }, [groupFilter, searchParams]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-4 pt-4 border-t">
              <Skeleton className="h-8 w-[300px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-medium mb-2">Geen berichten gevonden</h3>
        <p className="text-gray-500 mb-4">
          Er zijn nog geen berichten geplaatst in deze groep of met deze filters.
        </p>
      </div>
    );
  }

  if (openPost) {
    return (
      <CommunityPost 
        post={openPost} 
        onBack={() => setOpenPost(null)} 
      />
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => setOpenPost(post)}
          onLike={(postId) => handleLike(postId)}
          onDislike={(postId) => handleDislike(postId)}
        />
      ))}
    </div>
  );
}
