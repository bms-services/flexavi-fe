
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, FileText, Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadMediaProps {
  leadId: string;
}

type MediaItem = {
  id: string;
  url: string;
  type: "photo" | "document";
  title: string;
  date: string;
  category: "inspection" | "job" | "paperwork" | "other";
};

// Example media items for demonstration
const demoMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224",
    type: "photo",
    title: "Inspectie dak",
    date: "2024-04-15",
    category: "inspection"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    type: "photo",
    title: "Gevel foto",
    date: "2024-04-15",
    category: "job"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624",
    type: "document",
    title: "Ondertekende offerte",
    date: "2024-04-10",
    category: "paperwork"
  }
];

export const LeadMedia: React.FC<LeadMediaProps> = ({ leadId }) => {
  const [media, setMedia] = useState<MediaItem[]>(demoMedia);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "document">("photo");
  const [mediaCategory, setMediaCategory] = useState<"inspection" | "job" | "paperwork" | "other">("inspection");

  const handleUploadMedia = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would upload the file to a server
    // This is just a demo to simulate adding a new media item
    
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
      type: mediaType,
      title: titleInput.value,
      date: new Date().toISOString().split('T')[0],
      category: mediaCategory
    };
    
    setMedia([newMedia, ...media]);
    setIsUploadOpen(false);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Media</CardTitle>
            <CardDescription>Foto's en documenten van deze lead</CardDescription>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Media Toevoegen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Media Toevoegen</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUploadMedia} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="media-type">Media Type</Label>
                  <Select 
                    defaultValue={mediaType} 
                    onValueChange={(value) => setMediaType(value as "photo" | "document")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photo">Foto</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="media-category">Categorie</Label>
                  <Select 
                    defaultValue={mediaCategory} 
                    onValueChange={(value) => setMediaCategory(value as "inspection" | "job" | "paperwork" | "other")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inspection">Inspectie</SelectItem>
                      <SelectItem value="job">Klus</SelectItem>
                      <SelectItem value="paperwork">Papierwerk</SelectItem>
                      <SelectItem value="other">Overig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input id="title" name="title" placeholder="Geef een omschrijving" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Bestand</Label>
                  <Input id="file" name="file" type="file" required />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Upload</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Alle Media</TabsTrigger>
            <TabsTrigger value="photos">Foto's</TabsTrigger>
            <TabsTrigger value="documents">Documenten</TabsTrigger>
            <TabsTrigger value="inspection">Inspectie</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    {item.type === "photo" ? (
                      <img 
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.filter(item => item.type === "photo").map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.filter(item => item.type === "document").map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="inspection" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.filter(item => item.category === "inspection").map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    {item.type === "photo" ? (
                      <img 
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="mt-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
