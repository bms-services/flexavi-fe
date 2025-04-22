import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Group, PostMedia, PostType } from "@/types/community";
import { useCommunityGroups, useCommunityPosts } from "@/hooks/use-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl,
  FormField, 
  FormItem, 
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Image, 
  Video, 
  Paperclip, 
  X,
  AlertCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PostEditor } from './PostEditor';

interface CommunityCreatePostProps {
  onPostCreated: () => void;
  preselectedGroup?: Group | null;
}

const formSchema = z.object({
  title: z.string().min(3, "Titel moet minimaal 3 karakters bevatten").max(100, "Titel mag maximaal 100 karakters bevatten"),
  content: z.string().min(10, "Inhoud moet minimaal 10 karakters bevatten"),
  groupId: z.string().min(1, "Selecteer een groep"),
  type: z.nativeEnum(PostType),
});

export function CommunityCreatePost({ onPostCreated, preselectedGroup }: CommunityCreatePostProps) {
  const { groups } = useCommunityGroups();
  const { createPost } = useCommunityPosts();
  const [mediaFiles, setMediaFiles] = useState<PostMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      groupId: preselectedGroup?.id || "",
      type: PostType.GENERAL,
    },
  });

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
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const removeMedia = (mediaId: string) => {
    setMediaFiles(prev => prev.filter(media => media.id !== mediaId));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPost({
      ...values,
      media: mediaFiles,
    }).then(() => {
      onPostCreated();
      toast.success("Bericht geplaatst");
    }).catch(() => {
      toast.error("Er is iets misgegaan bij het plaatsen van je bericht");
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Nieuw bericht</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Geef je bericht een titel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groep</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een groep" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type bericht</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={PostType.GENERAL}>Algemeen</SelectItem>
                      <SelectItem value={PostType.JOB_LISTING}>Personeel gezocht</SelectItem>
                      <SelectItem value={PostType.PROJECT_SHOWCASE}>Project showcase</SelectItem>
                      <SelectItem value={PostType.OUTSOURCE_WORK}>Werk uitbesteden</SelectItem>
                      <SelectItem value={PostType.TECHNICAL_ADVICE}>Technisch advies</SelectItem>
                      <SelectItem value={PostType.LEGAL_ADVICE}>Juridisch advies</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inhoud</FormLabel>
                <FormControl>
                  <PostEditor 
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Waar gaat je bericht over?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Media upload section */}
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
            </div>
            
            {mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mediaFiles.map((media) => (
                  <div key={media.id} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border">
                      {media.type === 'image' ? (
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
            )}
            
            {mediaFiles.length > 0 && (
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Je hebt {mediaFiles.length} {mediaFiles.length === 1 ? 'bestand' : 'bestanden'} toegevoegd.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={onPostCreated}
            >
              Annuleren
            </Button>
            <Button type="submit">
              Bericht plaatsen
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
