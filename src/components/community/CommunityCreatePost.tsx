
import { useCommunityPosts } from "@/hooks/use-community";
import { toast } from "sonner";
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
      toast.success("Bericht geplaatst");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het plaatsen van je bericht");
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
