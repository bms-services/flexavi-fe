
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PostMedia } from "@/types/community";
import { Image, Video, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GifSearch } from "./GifSearch";

export function MediaUpload() {
  const [mediaFiles, setMediaFiles] = useState<PostMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    if (mediaFiles.length + files.length > 10) {
      toast.error("Je kunt maximaal 10 bestanden uploaden");
      return;
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      
      if (!isImage && !isVideo) {
        toast.error("Alleen afbeeldingen en video's zijn toegestaan");
        continue;
      }
      
      const fileURL = URL.createObjectURL(file);
      
      const newMedia: PostMedia = {
        id: `temp-${Date.now()}-${i}`,
        type: isImage ? "image" : "video",
        url: fileURL,
        thumbnailUrl: isImage ? fileURL : undefined,
      };
      
      setMediaFiles(prev => [...prev, newMedia]);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleGifSelected = (gif: PostMedia) => {
    if (mediaFiles.length >= 10) {
      toast.error("Je kunt maximaal 10 bestanden uploaden");
      return;
    }
    
    setMediaFiles(prev => [...prev, gif]);
  };
  
  const removeMedia = (mediaId: string) => {
    setMediaFiles(prev => prev.filter(media => media.id !== mediaId));
  };

  return (
    <div className="border rounded-md p-4">
      <h3 className="font-medium mb-2">Media toevoegen</h3>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleMediaUpload}
      />
      
      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="h-4 w-4" />
          <span>Afbeeldingen</span>
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => fileInputRef.current?.click()}
        >
          <Video className="h-4 w-4" />
          <span>Video's</span>
        </Button>
        
        <GifSearch onGifSelected={handleGifSelected} />
      </div>
      
      {mediaFiles.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {mediaFiles.map((media) => (
              <div key={media.id} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border">
                  {media.type === 'image' || media.type === 'gif' ? (
                    <img 
                      src={media.url} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={media.url} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeMedia(media.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm opacity-70 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <Alert className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Je hebt {mediaFiles.length} {mediaFiles.length === 1 ? 'bestand' : 'bestanden'} toegevoegd.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
