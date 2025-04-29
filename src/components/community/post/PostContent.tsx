
import { Post } from "@/types/community";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const imageUrl = post.image || (post.media && post.media.length > 0 ? post.media[0].url : undefined);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">{post.title}</h1>
      
      <div className="mt-3 text-sm whitespace-pre-wrap">
        {post.content}
      </div>
      
      {imageUrl && (
        <div className="mt-4 rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title}
            className="w-full object-cover" 
          />
        </div>
      )}
    </div>
  );
}
