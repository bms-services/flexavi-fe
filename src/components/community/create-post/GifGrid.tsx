
import { PostMedia } from "@/types/community";

interface GifGridProps {
  searchResults: Array<{ id: string; url: string }>;
  onSelectGif: (gifUrl: string) => void;
}

export function GifGrid({ searchResults, onSelectGif }: GifGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-1">
      {searchResults.map((gif) => (
        <div 
          key={gif.id} 
          className="cursor-pointer rounded-md overflow-hidden border hover:border-primary"
          onClick={() => onSelectGif(gif.url)}
        >
          <img 
            src={gif.url} 
            alt="GIF" 
            className="w-full h-auto aspect-video object-cover"
          />
        </div>
      ))}
    </div>
  );
}
