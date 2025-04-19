
import React, { useState } from 'react';
import { WizardData } from '../useProjectWizard';
import { Button } from '@/components/ui/button';
import { Image, X, Upload } from 'lucide-react';

interface WizardPhotosStepProps {
  wizardData: WizardData;
  setWizardData: (data: WizardData) => void;
}

export const WizardPhotosStep: React.FC<WizardPhotosStepProps> = ({
  wizardData,
  setWizardData
}) => {
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>(
    wizardData.photos || []
  );

  // These are mock functions as actual file uploading isn't implemented
  const handleAddPhoto = () => {
    // Mock uploading a photo
    const mockPhotos = [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ];
    
    const newPhoto = {
      name: `Foto ${photos.length + 1}`,
      url: mockPhotos[Math.floor(Math.random() * mockPhotos.length)]
    };
    
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    setWizardData({
      ...wizardData,
      photos: updatedPhotos
    });
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    setWizardData({
      ...wizardData,
      photos: updatedPhotos
    });
  };

  const handleSkip = () => {
    // Clear photos
    setPhotos([]);
    setWizardData({
      ...wizardData,
      photos: []
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Voeg foto's toe (optioneel)</h2>
        <p className="text-muted-foreground mb-4">
          Voeg foto's toe aan het project om de voortgang te documenteren
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group border rounded-md overflow-hidden">
              <img 
                src={photo.url} 
                alt={photo.name} 
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2 bg-background">
                <p className="text-sm truncate">{photo.name}</p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleAddPhoto}
            className="border-2 border-dashed rounded-md h-52 flex flex-col items-center justify-center gap-2 hover:bg-accent/50 transition-colors"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground">Foto toevoegen</span>
          </button>
        </div>

        {photos.length === 0 && (
          <div className="p-4 text-center border rounded-md mb-4">
            <Image className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Er zijn nog geen foto's toegevoegd aan dit project
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleSkip}
          >
            Overslaan
          </Button>
        </div>
      </div>
    </div>
  );
};
