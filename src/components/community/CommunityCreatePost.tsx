
import { useCommunityPosts } from "@/hooks/community";

import { Group } from "@/types/community";
import { CreatePostForm } from "./create-post/CreatePostForm";

interface CommunityCreatePostProps {
  onPostCreated: () => void;
  preselectedGroup?: Group | null;
}

export function CommunityCreatePost({ onPostCreated, preselectedGroup }: CommunityCreatePostProps) {
  const { createPost } = useCommunityPosts();

  const handlePostCreate = async (values: any) => {
    try {
      await createPost(values);
      onPostCreated();
    } catch (error) {
      console.error("Error creating post:", error);
    
    }
  };

  return (
    <CreatePostForm 
      onSubmit={handlePostCreate}
      onCancel={onPostCreated}
      preselectedGroup={preselectedGroup}
    />
  );
}
